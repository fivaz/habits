"use server";

import { revalidatePath } from "next/cache";

import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { DATE, ROUTES } from "@/lib/consts";
import { HabitUI, habitUIArgs, TodayHabitUI } from "@/lib/habits/type";
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

		return habits.map(({ logs, ...habit }) => ({
			...habit,
			// If the array has an item, it was completed today
			isCompletedToday: logs.length > 0,
		}));
	} catch (error) {
		logError(error, "getHabitsAction");
		throw new Error("Could not retrieve habits.");
	}
}

export async function createHabitAction({
	id,
	anchor,
	anchorCategory,
	tinyBehavior,
	celebration,
}: HabitUI) {
	try {
		const userId = await getUserId();

		await prisma.habitRecipe.create({
			data: {
				id,
				anchor,
				tinyBehavior,
				celebration,
				userId,
				anchorCategory,
				rehearsalCount: 0,
			},
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "createHabit", { extra: { id, anchor, tinyBehavior, celebration } });
		throw new Error("Could not create habit. Please try again later.");
	}
}

export async function updateHabitAction({
	id,
	anchor,
	tinyBehavior,
	celebration,
	anchorCategory,
}: HabitUI) {
	try {
		const userId = await getUserId();

		if (!id) {
			throw new Error("Missing habit ID");
		}

		await prisma.habitRecipe.update({
			where: { id, userId },
			data: {
				anchor,
				tinyBehavior,
				celebration,
				anchorCategory,
			},
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "updateHabit", {
			extra: { anchor, tinyBehavior, celebration, anchorCategory, id },
		});
		throw new Error("Could not update habit. Please try again later.");
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
