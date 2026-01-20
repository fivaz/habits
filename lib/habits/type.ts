import { Prisma } from "@/lib/generated/prisma/client";

export const habitUIArgs = {
	select: {
		id: true,
		celebration: true,
		tinyBehavior: true,
		anchor: true,
	},
} satisfies Prisma.HabitRecipeDefaultArgs;

export type HabitUI = Prisma.HabitRecipeGetPayload<typeof habitUIArgs>;

export function getEmptyHabit(): HabitUI {
	return {
		id: "",
		anchor: "",
		tinyBehavior: "",
		celebration: "",
	};
}
