import { useEffect, useState } from "react";

import { toast } from "sonner";

import { AnchorStepForm } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-step-form";
import { BehaviorStepForm } from "@/app/(dashboard)/_components/habit-form/behavior-step/behavior-step-form";
import { CelebrationStepForm } from "@/app/(dashboard)/_components/habit-form/celebration-step/celebration-step-form";
import { RehearsalStepForm } from "@/app/(dashboard)/_components/habit-form/rehearsal-step/rehearsal-step-form";
import { StepHeader } from "@/app/(dashboard)/_components/habit-form/step-header";
import { Step, steps } from "@/app/(dashboard)/_components/service";
import { DrawerDialog } from "@/components/drawer-dialog";
import { useHabitMutations } from "@/hooks/habits-store";
import { createHabitAction, updateHabitAction } from "@/lib/habits/actions";
import { getEmptyHabit, TodayHabitUI } from "@/lib/habits/type";

type HabitFormProps = {
	habit?: TodayHabitUI;
	startStep?: number;
	setOpen: (open: boolean) => void;
	open: boolean;
};

export function HabitForm({
	setOpen,
	open,
	startStep = Step.ANCHOR,
	habit = getEmptyHabit(),
}: HabitFormProps) {
	const { addItem, updateItem } = useHabitMutations();
	const [currentStepIndex, setCurrentStepIndex] = useState(startStep);
	const onNext = () => setCurrentStepIndex((s) => Math.min(s + 1, steps.length - 1));
	const onPrevious = () => setCurrentStepIndex((s) => Math.max(s - 1, 0));
	const [habitIn, setHabitIn] = useState<TodayHabitUI>(habit);

	useEffect(() => {
		if (open) {
			setCurrentStepIndex(startStep);
			setHabitIn(habit);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	const onClose = () => setOpen(false);

	const setAnchorValue = (value: string) => setHabitIn((prev) => ({ ...prev, anchor: value }));

	const setBehaviorValue = (value: string) =>
		setHabitIn((prev) => ({ ...prev, tinyBehavior: value }));

	const setCelebrationValue = (value: string) =>
		setHabitIn((prev) => ({ ...prev, celebration: value }));

	const incrementRehearsal = () =>
		setHabitIn((prev) => ({ ...prev, rehearsalCount: prev.rehearsalCount + 1 }));

	const handleSave = () => {
		const optimisticHabit: TodayHabitUI = {
			...habitIn,
			id: habitIn.id || crypto.randomUUID(),
		};

		if (habitIn.id) {
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
	};

	const renderStep = (step: number) => {
		switch (step) {
			case Step.ANCHOR:
				return (
					<AnchorStepForm value={habitIn.anchor} setAnchorValue={setAnchorValue} onNext={onNext} />
				);
			case Step.BEHAVIOR:
				return (
					<BehaviorStepForm
						value={habitIn.tinyBehavior}
						setBehaviorValue={setBehaviorValue}
						onNext={onNext}
						onPrevious={onPrevious}
					/>
				);
			case Step.CELEBRATION:
				return (
					<CelebrationStepForm
						value={habitIn.celebration}
						setCelebrationValue={setCelebrationValue}
						onNext={onNext}
						onPrevious={onPrevious}
						onSave={handleSave}
					/>
				);
			case Step.REHEARSAL:
				return (
					<RehearsalStepForm
						incrementRehearsal={incrementRehearsal}
						onClose={onClose}
						habit={habitIn}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<DrawerDialog open={open} setOpen={setOpen}>
			<StepHeader
				rehearsalCount={habitIn.rehearsalCount}
				currentStepIndex={currentStepIndex}
				onClose={onClose}
			/>
			{renderStep(currentStepIndex)}
		</DrawerDialog>
	);
}
