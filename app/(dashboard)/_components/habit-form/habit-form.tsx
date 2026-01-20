import { useState } from "react";

import { toast } from "sonner";

import { AnchorStepForm } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-step-form";
import { BehaviorStepForm } from "@/app/(dashboard)/_components/habit-form/behavior-step/behavior-step-form";
import { CelebrationStepForm } from "@/app/(dashboard)/_components/habit-form/celebration-step/celebration-step-form";
import { RehearsalStepForm } from "@/app/(dashboard)/_components/habit-form/rehearsal-step/rehearsal-step-form";
import { StepFormHeader } from "@/app/(dashboard)/_components/habit-form/step-form-header";
import { REHEARSAL_TARGET, Step, steps } from "@/app/(dashboard)/_components/service";
import { useHabitMutations } from "@/hooks/habits-store";
import { createHabitAction, updateHabitAction } from "@/lib/habits/actions";
import { getEmptyHabit, TodayHabitUI } from "@/lib/habits/type";

type HabitFormProps = {
	onClose: () => void;
	habit: TodayHabitUI;
};

export function HabitForm({ habit: initialHabit, onClose }: HabitFormProps) {
	const { addItem, updateItem } = useHabitMutations();
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const onNext = () => setCurrentStepIndex((s) => Math.min(s + 1, steps.length - 1));
	const onPrevious = () => setCurrentStepIndex((s) => Math.max(s - 1, 0));
	const [rehearsalCount, setRehearsalCount] = useState<number>(0);
	const [habit, setHabit] = useState<TodayHabitUI>(initialHabit);

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
		const optimisticHabit: TodayHabitUI = {
			...habit,
			id: habit.id || crypto.randomUUID(),
		};

		if (habit.id) {
			updateItem(optimisticHabit, {
				persist: () => updateHabitAction(optimisticHabit),
				onSuccess: () => toast.success("Habit updated successfully."),
				onError: () =>
					toast.error("Failed to update habit.", {
						description: "Your changes have been reverted, please try again",
					}),
			});
		} else {
			addItem(optimisticHabit, {
				persist: () => createHabitAction(optimisticHabit),
				onSuccess: () => toast.success("Habit created successfully."),
				onError: () =>
					toast.error("Failed to create habit.", {
						description: "Your changes have been reverted, please try again",
					}),
			});
		}

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
