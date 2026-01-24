import React, { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { CelebrationSuggestions } from "@/app/(dashboard)/_components/habit-form/celebration-step/celebration-suggestions";
import { StepTextArea, StepTip } from "@/app/(dashboard)/_components/habit-form/step-body";
import { NextButton, PreviousButton } from "@/app/(dashboard)/_components/habit-form/step-footer";
import { Step, steps } from "@/app/(dashboard)/_components/service";
import { TodayHabitUI } from "@/lib/habits/type";

type CelebrationStepFormProps = {
	onNext: () => void;
	onPrevious: () => void;
	setHabitIn: Dispatch<SetStateAction<TodayHabitUI>>;
	value: string;
	onSave: () => void;
};

export function CelebrationStepForm({
	setHabitIn,
	value,
	onNext,
	onPrevious,
	onSave,
}: CelebrationStepFormProps) {
	const step = steps[Step.CELEBRATION];

	const setCelebrationValue = (value: string) =>
		setHabitIn((prev) => ({ ...prev, celebration: value }));

	return (
		<>
			<div className="flex-1 overflow-y-auto p-6">
				<AnimatePresence mode="wait">
					<motion.div
						key={Step.ANCHOR}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-4"
					>
						<div className="text-foreground">{step.subtitle}</div>

						<StepTextArea step={step} value={value} setValue={setCelebrationValue} />

						<CelebrationSuggestions value={value} setValue={setCelebrationValue} />

						<StepTip step={step} />
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="flex gap-3 border-t border-gray-300 bg-gray-100 bg-linear-to-br p-6 dark:border-gray-500 dark:bg-gray-800">
				<PreviousButton onPrevious={onPrevious} />
				<NextButton
					step={step}
					onNext={() => {
						onNext();
						onSave();
					}}
				/>
			</div>
		</>
	);
}
