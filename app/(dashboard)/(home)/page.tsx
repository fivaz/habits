import { HabitTracker } from "@/app/(dashboard)/(home)/_components/habit-tracker";
import { HabitsProvider } from "@/hooks/habits-store";
import { getHabitsAction } from "@/lib/habits/actions";

export default async function HomePage() {
	const habits = await getHabitsAction();
	return (
		<HabitsProvider initialItems={habits}>
			<HabitTracker />
		</HabitsProvider>
	);
}
