"use server";

import { revalidatePath } from "next/cache";

import { addDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { defaultAnchorCategory } from "@/lib/category/type";
import { DATE, ROUTES } from "@/lib/consts";
import { habitUIArgs, TodayHabitUI } from "@/lib/habits/type";
import { getUpdatedStreak } from "@/lib/habits/utils";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches all active habit recipes for a specific user.
 */
export async function getHabitsAction(): Promise<TodayHabitUI[]> {
	const userId = await getUserId();

	try {
		const [user, habits] = await Promise.all([
			prisma.user.findUnique({
				where: { id: userId },
				select: { timezone: true },
			}),
			prisma.habitRecipe.findMany({
				where: { userId, isActive: true },
				select: {
					...habitUIArgs.select,
					lastCompletedDate: true,
				},
				orderBy: { createdAt: "desc" },
			}),
		]);

		if (!user) throw new Error("User not found");

		// Calculate "today" based on user's local time
		const today = formatInTimeZone(new Date(), user.timezone, DATE);

		return habits.map(({ anchorCategory, lastCompletedDate, ...habit }) => ({
			...habit,
			anchorCategory: anchorCategory || defaultAnchorCategory,
			isCompletedToday: lastCompletedDate === today,
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

		const data = {
			anchor,
			tinyBehavior,
			celebration,
			rehearsalCount: 0, // force user to rehearsal again on edit
			anchorCategoryId,
		};

		await prisma.habitRecipe.upsert({
			where: { id, userId },
			create: {
				...data,
				userId,
				id, // use the provided id for creation, so rehearsal updates the right habit
			},
			update: data,
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

		// 1. Get User Timezone
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { timezone: true },
		});

		if (!user) throw new Error("User not found");

		// 2. Setup Dates
		const now = new Date();
		const today = formatInTimeZone(now, user.timezone, DATE);
		const yesterday = formatInTimeZone(addDays(now, -1), user.timezone, DATE);

		// 3. Database Operation
		await prisma.$transaction(async (tx) => {
			const habit = await tx.habitRecipe.findUnique({
				where: { id: habitId, userId },
				select: {
					streak: true,
					lastCompletedDate: true,
					logs: { where: { date: today } }, // Check if logged today
				},
			});

			// Exit if habit doesn't exist or is already completed today
			if (!habit || habit.logs.length > 0) return;

			const newStreak = getUpdatedStreak(habit.streak, habit.lastCompletedDate, today, yesterday);

			// Create log and update stats simultaneously
			await tx.dailyLog.create({
				data: { habitId, date: today, status: "completed" },
			});

			await tx.habitRecipe.update({
				where: { id: habitId, userId },
				data: {
					streak: newStreak,
					totalCompletions: { increment: 1 },
					lastCompletedDate: today,
				},
			});
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "logHabitCompletion", { extra: { habitId } });
		throw new Error("Failed to log completion.");
	}
}
