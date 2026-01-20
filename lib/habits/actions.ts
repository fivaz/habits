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
