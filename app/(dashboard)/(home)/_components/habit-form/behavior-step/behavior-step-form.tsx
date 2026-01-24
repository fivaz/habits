import React, { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { StepTextArea, StepTip } from "@/app/(dashboard)/(home)/_components/habit-form/step-body";
import {
	NextButton,
	PreviousButton,
} from "@/app/(dashboard)/(home)/_components/habit-form/step-footer";
import { Step, steps } from "@/app/(dashboard)/(home)/_components/service";
import { TodayHabitUI } from "@/lib/habits/type";

type BehaviorStepFormProps = {
	onNext: () => void;
	onPrevious: () => void;
	setHabitIn: Dispatch<SetStateAction<TodayHabitUI>>;
	value: string;
};

export function BehaviorStepForm({ setHabitIn, value, onNext, onPrevious }: BehaviorStepFormProps) {
	const step = steps[Step.BEHAVIOR];

	const setBehaviorValue = (value: string) =>
		setHabitIn((prev) => ({ ...prev, tinyBehavior: value }));

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
						<div className="text-primary">{step.subtitle}</div>

						<StepTextArea step={step} value={value} setValue={setBehaviorValue} />

						<StepTip step={step} />
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="flex gap-3 border-t border-gray-300 bg-gray-100 bg-linear-to-br p-6 dark:border-gray-500 dark:bg-gray-800">
				<PreviousButton onPrevious={onPrevious} />
				<NextButton step={step} onNext={onNext} />
			</div>
		</>
	);
}
