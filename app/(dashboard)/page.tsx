import { HabitTracker } from "@/app/(dashboard)/_components/habit-tracker";
import { getHabits } from "@/lib/habits/actions";

export default async function HomePage() {
	const habits = await getHabits();
	return <HabitTracker habits={habits} />;
}
