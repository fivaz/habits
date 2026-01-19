"use server";

import { HabitRecipe } from "@/lib/generated/prisma/client";
import { logError } from "@/lib/logger"; // Adjust this path to your prisma client location
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

/**
 * Fetches all active habit recipes for a specific user.
 */
export async function getHabits(): Promise<HabitRecipe[]> {
	const userId = await getUserId();

	try {
		return await prisma.habitRecipe.findMany({
			where: {
				userId,
				is_active: true,
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
