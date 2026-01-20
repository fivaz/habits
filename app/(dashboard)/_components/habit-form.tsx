import React, { useState } from "react";

import { toast } from "sonner";

import { AnchorStepForm } from "@/app/(dashboard)/_components/anchor-step-form";
import { BehaviorStepForm } from "@/app/(dashboard)/_components/behavior-step-form";
import { CelebrationStepForm } from "@/app/(dashboard)/_components/celebration-step-form";
import { RehearsalStepForm } from "@/app/(dashboard)/_components/rehearsal-step-form";
import { REHEARSAL_TARGET, Step, steps } from "@/app/(dashboard)/_components/service";
import { StepFormHeader } from "@/app/(dashboard)/_components/step-form-header";
import { useHabitMutations } from "@/hooks/habits-store";
import { createHabitAction } from "@/lib/habits/actions";
import { getEmptyHabit, HabitUI } from "@/lib/habits/type";

type HabitFormProps = {
	onClose: () => void;
};

export function HabitForm({ onClose }: HabitFormProps) {
	const { addItem } = useHabitMutations();
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const onNext = () => setCurrentStepIndex((s) => Math.min(s + 1, steps.length - 1));
	const onPrevious = () => setCurrentStepIndex((s) => Math.max(s - 1, 0));
	const [rehearsalCount, setRehearsalCount] = useState<number>(0);
	const [habit, setHabit] = useState<HabitUI>(getEmptyHabit());

	const setAnchorValue = (value: string) => {
		setHabit((prev) => ({ ...prev, anchor: value }));
	};

	const setBehaviorValue = (value: string) => {
		setHabit((prev) => ({ ...prev, tinyBehavior: value }));
	};

	const setCelebrationValue = (value: string) => {
		setHabit((prev) => ({ ...prev, celebration: value }));
	};

	const resetForm = () => {
		setCurrentStepIndex(0);
		setRehearsalCount(0);
		setHabit(getEmptyHabit());
	};

	const handleSave = () => {
		console.log(habit);
		addItem(habit, {
			persist: () => createHabitAction(habit),
			onSuccess: () => toast.success("Habit Saved"),
			onError: () => toast.error("Connection lost. Reverting changes..."),
		});
		resetForm();
		onClose();
	};

	const onRehearse = () => {
		if (rehearsalCount < REHEARSAL_TARGET - 1) {
			setRehearsalCount((prev) => prev + 1);
		} else {
			handleSave();
			resetForm();
		}
	};

	const renderStep = (step: number) => {
		switch (step) {
			case Step.ANCHOR:
				return (
					<AnchorStepForm value={habit.anchor} setAnchorValue={setAnchorValue} onNext={onNext} />
				);
			case Step.BEHAVIOR:
				return (
					<BehaviorStepForm
						value={habit.tinyBehavior}
						setBehaviorValue={setBehaviorValue}
						onNext={onNext}
						onPrevious={onPrevious}
					/>
				);
			case Step.CELEBRATION:
				return (
					<CelebrationStepForm
						value={habit.celebration}
						setCelebrationValue={setCelebrationValue}
						onNext={onNext}
						onPrevious={onPrevious}
					/>
				);
			case Step.REHEARSAL:
				return (
					<RehearsalStepForm
						habit={habit}
						rehearsalCount={rehearsalCount}
						onRehearse={onRehearse}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<StepFormHeader
				rehearsalCount={rehearsalCount}
				currentStepIndex={currentStepIndex}
				onClose={onClose}
			/>

			{renderStep(currentStepIndex)}
		</>
	);
}
