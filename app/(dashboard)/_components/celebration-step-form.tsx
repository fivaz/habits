import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { CelebrationSuggestions } from "@/app/(dashboard)/_components/celebration-suggestions";
import { Step, steps } from "@/app/(dashboard)/_components/service";
import { StepTextArea, StepTip } from "@/app/(dashboard)/_components/step-body";
import { NextButton, PreviousButton } from "@/app/(dashboard)/_components/step-footer";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

type CelebrationStepFormProps = {
	onNext: () => void;
	onPrevious: () => void;
	setCelebrationValue: (value: string) => void;
	value: string;
};

export function CelebrationStepForm({
	setCelebrationValue,
	value,
	onNext,
	onPrevious,
}: CelebrationStepFormProps) {
	const step = steps[Step.CELEBRATION];
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

						<StepTextArea step={step} value={value} setValue={setCelebrationValue} />

						<CelebrationSuggestions value={value} setValue={setCelebrationValue} />

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
