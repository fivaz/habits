import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { StepTextArea, StepTip } from "@/app/(dashboard)/_components/habit-form/step-body";
import { NextButton, PreviousButton } from "@/app/(dashboard)/_components/habit-form/step-footer";
import { Step, steps } from "@/app/(dashboard)/_components/service";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

type BehaviorStepFormProps = {
	onNext: () => void;
	onPrevious: () => void;
	setBehaviorValue: (value: string) => void;
	value: string;
};

export function BehaviorStepForm({
	setBehaviorValue,
	value,
	onNext,
	onPrevious,
}: BehaviorStepFormProps) {
	const step = steps[Step.BEHAVIOR];
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
						<DialogDescription className="text-stone-600">{step.subtitle}</DialogDescription>

						<StepTextArea step={step} value={value} setValue={setBehaviorValue} />

						<StepTip step={step} />
					</motion.div>
				</AnimatePresence>
			</div>

			<DialogFooter className="flex gap-3 border-t bg-stone-50 p-4">
				<PreviousButton onPrevious={onPrevious} />
				<NextButton step={step} onNext={onNext} />
			</DialogFooter>
		</>
	);
}
