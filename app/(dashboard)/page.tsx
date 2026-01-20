import { HabitTracker } from "@/app/(dashboard)/_components/habit-tracker";
import { getHabitsAction } from "@/lib/habits/actions";

export default async function HomePage() {
	const habits = await getHabitsAction();
	return <HabitTracker habits={habits} />;
}
