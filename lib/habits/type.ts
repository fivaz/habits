import { Prisma } from "@/lib/generated/prisma/client";

export const habitUIArgs = {
	select: {
		id: true,
		celebration: true,
		tinyBehavior: true,
		anchor: true,
		anchorCategory: true,
		streak: true,
		totalCompletions: true,
		rehearsalCount: true,
	},
} satisfies Prisma.HabitRecipeDefaultArgs;

export type HabitUI = Prisma.HabitRecipeGetPayload<typeof habitUIArgs>;

export type TodayHabitUI = HabitUI & { isCompletedToday: boolean };

export function getEmptyHabit(): TodayHabitUI {
	return {
		id: "",
		anchor: "",
		tinyBehavior: "",
		celebration: "",
		anchorCategory: "other",
		streak: 0,
		totalCompletions: 0,
		isCompletedToday: false,
		rehearsalCount: 0,
	};
}

export const HabitPrefix = {
	anchor: "After I",
	tinyBehavior: "I will",
	celebration: "Then I will",
};
