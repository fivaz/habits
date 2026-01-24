import { motion } from "framer-motion";

import { TodayHabitUI } from "@/lib/habits/type";

type ProgressBarProps = {
	habits: TodayHabitUI[];
};

export function ProgressBar({ habits }: ProgressBarProps) {
	const completedCount = habits.filter((habit) => habit.isCompletedToday).length;
	const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

	return (
		habits.length > 0 && (
			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Today&#39;s Progress</span>
					<span className="text-muted-foreground font-semibold">
						{completedCount}/{habits.length}
					</span>
				</div>
				<div className="h-2 overflow-hidden rounded-full bg-stone-100">
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="h-full rounded-full bg-linear-to-r from-emerald-500 to-green-600"
					/>
				</div>
			</div>
		)
	);
}
