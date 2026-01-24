import React, { useState } from "react";

import {
	RedesignActionButtons,
	RedesignSuggestions,
} from "@/app/(dashboard)/(home)/_components/redesign-form/redesign-suggestions";
import { Textarea } from "@/components/ui/textarea";
import { TodayHabitUI } from "@/lib/habits/type";

type ForgotViewProps = {
	habit: TodayHabitUI;
	onResetFlow: () => void;
	updateHabit: (habit: TodayHabitUI) => void;
};

export function ForgotView({ updateHabit, habit, onResetFlow }: ForgotViewProps) {
	const [newAnchor, setNewAnchor] = useState<string>(habit.anchor);

	const onSubmit = () => {
		const optimizedHabit = { ...habit, anchor: newAnchor };
		updateHabit(optimizedHabit);
	};

	return (
		<>
			<RedesignSuggestions reasonId="forgot" />
			<div className="space-y-2">
				<label className="text-foreground text-sm font-medium">New Anchor</label>
				<div className="relative">
					<span className="absolute top-2.5 left-3 text-sm font-medium text-emerald-600">
						After I
					</span>
					<Textarea
						value={newAnchor}
						onChange={(e) => setNewAnchor(e.target.value)}
						className="min-h-20 rounded-xl border-stone-200 pl-16 focus:border-emerald-400 focus:ring-emerald-400"
						placeholder="existing routine..."
					/>
				</div>
			</div>
			<RedesignActionButtons onSubmit={onSubmit} onResetFlow={onResetFlow} />
		</>
	);
}
