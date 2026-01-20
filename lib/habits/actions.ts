"use server";

import { revalidatePath } from "next/cache";

import { ROUTES } from "@/lib/consts";
import { HabitUI, habitUIArgs } from "@/lib/habits/type";
import { logError } from "@/lib/logger"; // Adjust this path to your prisma client location
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches all active habit recipes for a specific user.
 */
export async function getHabitsAction(): Promise<HabitUI[]> {
	const userId = await getUserId();

	try {
		return prisma.habitRecipe.findMany({
			...habitUIArgs,
			where: {
				userId,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		logError(error, "getHabitsByUser");
		throw new Error("Could not retrieve habits. Please try again later.");
	}
}

export async function createHabitAction({ anchor, tinyBehavior, celebration }: HabitUI) {
	try {
		const userId = await getUserId();

		await prisma.habitRecipe.create({
			data: {
				anchor,
				tinyBehavior,
				celebration,
				userId,
			},
		});

		revalidatePath(ROUTES.HOME);
	} catch (error) {
		logError(error, "createHabit");
		throw new Error("Could not create habit. Please try again later.");
	}
}
