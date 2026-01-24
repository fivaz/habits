import React, { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { AnchorSuggestions } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-suggestions";
import { StepTextArea, StepTip } from "@/app/(dashboard)/_components/habit-form/step-body";
import { NextButton } from "@/app/(dashboard)/_components/habit-form/step-footer";
import { Step, steps } from "@/app/(dashboard)/_components/service";
import { TodayHabitUI } from "@/lib/habits/type";

type AnchorStepFormProps = {
	onNext: () => void;
	setHabitIn: Dispatch<SetStateAction<TodayHabitUI>>;
	value: string;
};

export function AnchorStepForm({ setHabitIn, value, onNext }: AnchorStepFormProps) {
	const step = steps[Step.ANCHOR];

	const setAnchorValue = (value: string) => setHabitIn((prev) => ({ ...prev, anchor: value }));

	return (
		<>
			{/* Scrollable content */}
			<div className="overflow-y-auto p-6">
				<AnimatePresence mode="wait">
					<motion.div
						key={Step.ANCHOR}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-4"
					>
						<div className="text-foreground">{step.subtitle}</div>
						<AnchorSuggestions value={value} setAnchorValue={setAnchorValue} />
						<StepTextArea step={step} value={value} setValue={setAnchorValue} />
						<StepTip step={step} />
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Footer */}
			<div className="flex gap-3 border-t border-gray-300 bg-gray-100 bg-linear-to-br p-6 dark:border-gray-500 dark:bg-gray-800">
				<NextButton step={step} onNext={onNext} />
			</div>
		</>
	);
}
