"use server";

import { revalidatePath } from "next/cache";

import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { defaultAnchorCategory } from "@/lib/category/type";
import { DATE, ROUTES } from "@/lib/consts";
import { habitUIArgs, TodayHabitUI } from "@/lib/habits/type";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches all active habit recipes for a specific user.
 */
export async function getHabitsAction(): Promise<TodayHabitUI[]> {
	const userId = await getUserId();
	const today = format(new Date(), DATE);

	try {
		const habits = await prisma.habitRecipe.findMany({
			where: {
				userId,
				isActive: true,
			},
			select: {
				...habitUIArgs.select,
				logs: {
					where: { date: today, status: "completed" },
					take: 1,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return habits.map(({ logs, anchorCategory, ...habit }) => ({
			...habit,
			anchorCategory: anchorCategory || defaultAnchorCategory, // fallback here
			isCompletedToday: logs.length > 0, // If the array has an item, it was completed today
		}));
	} catch (error) {
		logError(error, "getHabitsAction");
		throw new Error("Could not retrieve habits.");
	}
}

export async function upsertHabitAction({
	id,
	anchor,
	anchorCategory,
	tinyBehavior,
	celebration,
}: TodayHabitUI) {
	try {
		const userId = await getUserId();

		if (!id) {
			throw new Error("Missing habit ID");
		}

		const anchorCategoryId =
			anchorCategory.id === defaultAnchorCategory.id ? null : anchorCategory.id;

		await prisma.habitRecipe.upsert({
			where: { id },
			create: {
				id,
				anchor,
				tinyBehavior,
				celebration,
				userId,
				rehearsalCount: 0,
				anchorCategoryId,
			},
			update: {
				anchor,
				tinyBehavior,
				celebration,
				rehearsalCount: 0, // force user to rehearsal again on edit
				anchorCategoryId,
			},
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "upsertHabit", {
			extra: { id, anchor, tinyBehavior, celebration, anchorCategory },
		});
		throw new Error("Could not save habit. Please try again later.");
	}
}

export async function deleteHabitAction(id: string) {
	try {
		const userId = await getUserId();

		if (!id) {
			throw new Error("Habit ID is required for deletion.");
		}

		await prisma.habitRecipe.delete({
			where: { id, userId },
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "deleteHabitAction", { extra: { id } });

		throw new Error("Could not delete habit. It may have already been removed.");
	}
}

/**
 * Increments the rehearsal count for a specific habit.
 * This is used for the "wiring" phase to build initial muscle memory.
 */
export async function rehearsalHabitAction(habitId: string) {
	try {
		const userId = await getUserId();

		await prisma.habitRecipe.update({
			where: { id: habitId, userId },
			data: {
				rehearsalCount: {
					increment: 1,
				},
			},
			select: {
				rehearsalCount: true,
			},
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		console.error("Error in rehearsalHabitAction:", error);
		throw new Error("Failed to update rehearsal count.");
	}
}

export async function logHabitCompletionAction(habitId: string) {
	try {
		const userId = await getUserId();

		// 1. Get the user's timezone for the "Calendar Date"
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { timezone: true },
		});

		if (!user) throw new Error("User not found");

		const today = formatInTimeZone(new Date(), user.timezone, DATE);

		// 2. Atomic Transaction: Create log and increment counter
		await prisma.$transaction(async (tx) => {
			// Safety check: Ensure we don't duplicate if the UI guard fails
			const existing = await tx.dailyLog.findUnique({
				where: {
					habitId_date: { habitId, date: today },
				},
			});

			if (existing) return;

			await tx.dailyLog.create({
				data: {
					habitId,
					date: today,
					status: "completed",
				},
			});

			await tx.habitRecipe.update({
				where: { id: habitId, userId }, // userId check for security
				data: { totalCompletions: { increment: 1 } },
			});
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "logHabitCompletion");
		throw new Error("Failed to log completion.");
	}
}
