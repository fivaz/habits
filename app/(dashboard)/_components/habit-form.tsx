import React, { useState } from "react";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Repeat } from "lucide-react";

import { HabitUI, steps } from "@/app/(dashboard)/_components/service";
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
	const [rehearsalCount, setRehearsalCount] = useState<number>(0);
	const rehearsalTarget = 5;
	const [habit, setHabit] = useState<HabitUI>({
		anchor: "",
		behavior: "",
		celebration: "",
		rehearsal: "",
	});

	const resetForm = () => {
		setCurrentStepIndex(0);
		setRehearsalCount(0);
	};

	const handleSave = () => {
		console.log(habit);
	};

	const onRehearse = () => {
		if (rehearsalCount < rehearsalTarget - 1) {
			setRehearsalCount((prev) => prev + 1);
		} else {
			handleSave();
			resetForm();
		}
	};

	return (
		<>
			<StepFormHeader
				rehearsalCount={rehearsalCount}
				rehearsalTarget={rehearsalTarget}
				currentStepIndex={currentStepIndex}
				onClose={onClose}
			/>

			<StepFormBody
				rehearsalCount={rehearsalCount}
				habit={habit}
				setHabit={setHabit}
				currentStepIndex={currentStepIndex}
			/>

			<Footer
				onRehearse={onRehearse}
				rehearsalCount={rehearsalCount}
				rehearsalTarget={rehearsalTarget}
				currentStepIndex={currentStepIndex}
				onBack={onBack}
				onNext={onNext}
			/>
		</>
	);
}

type FooterProps = {
	currentStepIndex: number;
	rehearsalCount: number;
	rehearsalTarget: number;
	onNext: () => void;
	onBack: () => void;
	onRehearse: () => void;
};

function Footer({
	rehearsalTarget,
	rehearsalCount,
	onRehearse,
	currentStepIndex,
	onBack,
	onNext,
}: FooterProps) {
	const step = steps[currentStepIndex];

	return (
		<DialogFooter className="flex gap-3 border-t bg-stone-50 p-4">
			{step.id === "rehearsal" ? (
				<motion.div whileTap={{ scale: 0.95 }} className="w-full">
					<Button
						onClick={onRehearse}
						className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-violet-600 py-8 text-lg text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
					>
						<Repeat className="mr-2 h-6 w-6" />
						{rehearsalCount === rehearsalTarget - 1
							? "Complete Final Rehearsal!"
							: `I Rehearsed It! (${rehearsalCount + 1}/${rehearsalTarget})`}
					</Button>
				</motion.div>
			) : (
				<>
					{step.id !== "anchor" && (
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
				</>
			)}
		</DialogFooter>
	);
}
