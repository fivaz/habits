"use server";

import { revalidatePath } from "next/cache";

import { format } from "date-fns";

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

		return habits.map((habit) => ({
			...habit,
			// If the array has an item, it was completed today
			isCompletedToday: habit.logs.length > 0,
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

export async function toggleHabitCompletionAction(habitId: string) {
	try {
		const userId = await getUserId();
		const today = format(new Date(), DATE);

		const existingLog = await prisma.dailyLog.findFirst({
			where: {
				habitId,
				date: today,
				habit: { userId },
			},
		});

		if (existingLog) {
			// UNDO: Delete the log and decrement completions
			await prisma.$transaction([
				prisma.dailyLog.delete({
					where: { id: existingLog.id },
				}),
				prisma.habitRecipe.update({
					where: { id: habitId },
					data: { totalCompletions: { decrement: 1 } },
				}),
			]);
		} else {
			// DONE: Create the log and increment completions
			await prisma.$transaction([
				prisma.dailyLog.create({
					data: {
						habitId,
						date: today,
						status: "completed",
					},
				}),
				prisma.habitRecipe.update({
					where: { id: habitId },
					data: { totalCompletions: { increment: 1 } },
				}),
			]);
		}

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "toggleHabitCompletion");
		throw new Error("Could not update habit status.");
	}
}
