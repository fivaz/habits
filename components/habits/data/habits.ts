export interface HabitRecipe {
	id: string;
	anchor: string;
	tiny_behavior: string;
	celebration: string;
	anchor_category: "morning" | "meals" | "work" | "evening" | "other";
	is_active: boolean;
	streak: number;
	total_completions: number;
	last_completed_date?: string;
	times_redesigned: number;
}

export interface DailyLog {
	id: string;
	habit_id: string;
	date: string;
	status: "completed" | "missed" | "redesigned";
	celebration_done: boolean;
	notes?: string;
	redesign_reason?: "too_hard" | "forgot" | "anchor_missing" | "other";
}

// In-memory store
let _habits: HabitRecipe[] = [];
const _logs: DailyLog[] = [];

export const base44 = {
	entities: {
		HabitRecipe: {
			filter: async (criteria: Partial<HabitRecipe>): Promise<HabitRecipe[]> => {
				return _habits.filter((h) => h.is_active === criteria.is_active);
			},
			create: async (data: Omit<HabitRecipe, "id">): Promise<HabitRecipe> => {
				const newHabit = { ...data, id: Math.random().toString(36).substring(7) };
				_habits.push(newHabit);
				return newHabit;
			},
			update: async (id: string, data: Partial<HabitRecipe>): Promise<HabitRecipe | undefined> => {
				_habits = _habits.map((h) => (h.id === id ? { ...h, ...data } : h));
				return _habits.find((h) => h.id === id);
			},
			delete: async (id: string): Promise<void> => {
				_habits = _habits.filter((h) => h.id !== id);
			},
		},
		DailyLog: {
			filter: async (criteria: { date: string }): Promise<DailyLog[]> => {
				return _logs.filter((l) => l.date === criteria.date);
			},
			create: async (data: Omit<DailyLog, "id">): Promise<DailyLog> => {
				const newLog = { ...data, id: Math.random().toString(36).substring(7) };
				_logs.push(newLog);
				return newLog;
			},
		},
	},
};
