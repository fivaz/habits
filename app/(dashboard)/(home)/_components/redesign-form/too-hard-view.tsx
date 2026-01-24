import React, { useState } from "react";

import { Minimize2 } from "lucide-react";

import {
	RedesignActionButtons,
	RedesignSuggestions,
} from "@/app/(dashboard)/(home)/_components/redesign-form/redesign-suggestions";
import { Textarea } from "@/components/ui/textarea";
import { TodayHabitUI } from "@/lib/habits/type";

type TooHardViewProps = {
	habit: TodayHabitUI;
	onResetFlow: () => void;
	updateHabit: (habit: TodayHabitUI) => void;
};

export function TooHardView({ updateHabit, habit, onResetFlow }: TooHardViewProps) {
	const [newTinyBehavior, setNewTinyBehavior] = useState<string>(habit.tinyBehavior);

	const onSubmit = () => {
		const optimizedHabit = { ...habit, tinyBehavior: newTinyBehavior };
		updateHabit(optimizedHabit);
	};

	return (
		<>
			<RedesignSuggestions reasonId="too_hard" />
			<div className="space-y-2">
				<label className="text-foreground text-sm font-medium">New Tiny Behavior</label>
				<div className="relative">
					<span className="absolute top-2.5 left-3 text-sm font-medium text-emerald-600">
						I will
					</span>
					<Textarea
						value={newTinyBehavior}
						onChange={(e) => setNewTinyBehavior(e.target.value)}
						className="min-h-20 rounded-xl border-stone-200 pl-14 focus:border-emerald-400 focus:ring-emerald-400"
						placeholder="something even tinier..."
					/>
				</div>
				<p className="text-muted-foreground flex items-center gap-1 text-xs">
					<Minimize2 className="h-3 w-3" />
					Think: What's the 2-second version?
				</p>
			</div>
			<RedesignActionButtons onSubmit={onSubmit} onResetFlow={onResetFlow} />
		</>
	);
}
