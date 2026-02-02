import { defaultAnchorCategory } from "@/lib/category/type";
import { TodayHabitUI } from "@/lib/habits/type";

export function getEmptyHabit(): TodayHabitUI {
	return {
		id: "",
		anchor: "",
		tinyBehavior: "",
		celebration: "",
		anchorCategory: defaultAnchorCategory,
		streak: 0,
		totalCompletions: 0,
		isCompletedToday: false,
		rehearsalCount: 0,
	};
}

export function getUpdatedStreak(
	currentStreak: number,
	lastDate: string | null,
	today: string,
	yesterday: string,
): number {
	if (lastDate === today) return currentStreak; // Already logged today
	if (lastDate === yesterday) return currentStreak + 1; // Chain continues
	return 1; // Chain broken or first time
}
