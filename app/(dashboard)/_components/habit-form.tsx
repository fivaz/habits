import React, { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { steps } from "@/app/(dashboard)/_components/service";
import { StepFormBody } from "@/app/(dashboard)/_components/step-form-body";
import { StepFormHeader } from "@/app/(dashboard)/_components/step-form-header";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type HabitFormProps = {
	onClose: () => void;
};

export function HabitForm({ onClose }: HabitFormProps) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const onNext = () => setCurrentStepIndex((s) => Math.min(s + 1, steps.length - 1));
	const onBack = () => setCurrentStepIndex((s) => Math.max(s - 1, 0));
	return (
		<>
			<StepFormHeader currentStepIndex={currentStepIndex} onClose={onClose} />

			<StepFormBody currentStepIndex={currentStepIndex} />

			<Footer currentStepIndex={currentStepIndex} onBack={onBack} onNext={onNext} />
		</>
	);
}

type FooterProps = {
	currentStepIndex: number;
	onNext: () => void;
	onBack: () => void;
};

function Footer({ currentStepIndex, onBack, onNext }: FooterProps) {
	const step = steps[currentStepIndex];
	return (
		<DialogFooter className="flex gap-3 border-t bg-stone-50 p-4">
			{currentStepIndex > 0 && (
				<Button variant="outline" onClick={onBack} className="flex-1 rounded-xl py-6">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</Button>
			)}

			<Button
				onClick={onNext}
				className={cn(
					step.color,
					"flex-1 rounded-xl bg-linear-to-r py-6 text-white hover:opacity-90",
				)}
			>
				Next
				<ArrowRight className="ml-2 h-4 w-4" />
			</Button>
		</DialogFooter>
	);
}
