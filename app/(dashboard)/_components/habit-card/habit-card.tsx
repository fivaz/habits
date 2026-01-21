import React from "react";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

import { HabitActionButtons } from "@/app/(dashboard)/_components/habit-card/habit-action-buttons";
import { HabitSummary } from "@/app/(dashboard)/_components/habit-card/habit-summary";
import { Card } from "@/components/ui/card";
import { HabitUI, TodayHabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type HabitCardProps = {
	habit: TodayHabitUI;
};

export function HabitCard({ habit }: HabitCardProps) {
	return (
		<motion.div
			layout
			key={habit.id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={cn("bg-background relative overflow-hidden rounded-2xl shadow-sm")}
		>
			<div className="p-5">
				<HabitSummary habit={habit} />

				<StreakRow habit={habit} />

				<HabitActionButtons habit={habit} />
			</div>
		</motion.div>
	);
}

type StreakRowProps = {
	habit: HabitUI;
};

function StreakRow({ habit }: StreakRowProps) {
	return (
		habit.streak > 0 && (
			<div className="mb-4 flex items-center gap-4 rounded-xl border border-stone-100 p-3">
				<div className="flex items-center gap-1.5">
					<Flame className="h-4 w-4 text-orange-500" />
					<span className="text-sm font-semibold text-stone-700">{habit.streak}</span>
					<span className="text-xs text-stone-500">day streak</span>
				</div>
				<div className="h-4 w-px bg-stone-200" />
				<div className="text-xs text-stone-500">{habit.totalCompletions || 0} total</div>
			</div>
		)
	);
}
