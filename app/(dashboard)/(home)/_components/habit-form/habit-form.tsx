import { useEffect, useState } from "react";

import { toast } from "sonner";

import { AnchorStepForm } from "@/app/(dashboard)/(home)/_components/habit-form/anchor-step/anchor-step-form";
import { BehaviorStepForm } from "@/app/(dashboard)/(home)/_components/habit-form/behavior-step/behavior-step-form";
import { CelebrationStepForm } from "@/app/(dashboard)/(home)/_components/habit-form/celebration-step/celebration-step-form";
import { RehearsalStepForm } from "@/app/(dashboard)/(home)/_components/habit-form/rehearsal-step/rehearsal-step-form";
import { StepHeader } from "@/app/(dashboard)/(home)/_components/habit-form/step-header";
import { Step, steps } from "@/app/(dashboard)/(home)/_components/service";
import { DrawerDialog } from "@/components/drawer-dialog";
import { useHabitMutations } from "@/hooks/habits-store";
import { upsertHabitAction } from "@/lib/habits/actions";
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
	const { upsertItem } = useHabitMutations();
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

	const handleSave = () => {
		const optimisticHabit: TodayHabitUI = {
			...habitIn,
			id: habitIn.id || crypto.randomUUID(),
		};

		upsertItem(optimisticHabit, {
			persist: () => upsertHabitAction(optimisticHabit),
			onSuccess: () => {
				toast.success(habitIn.id ? "Habit updated successfully." : "Habit created successfully.");
				setHabitIn((prev) => ({ ...prev, id: optimisticHabit.id }));
			},
			onError: () =>
				toast.error("Failed to save habit.", {
					description: "Your changes have been reverted, please try again",
				}),
		});
	};

	const renderStep = (step: number) => {
		switch (step) {
			case Step.ANCHOR:
				return <AnchorStepForm value={habitIn.anchor} setHabitIn={setHabitIn} onNext={onNext} />;
			case Step.BEHAVIOR:
				return (
					<BehaviorStepForm
						value={habitIn.tinyBehavior}
						setHabitIn={setHabitIn}
						onNext={onNext}
						onPrevious={onPrevious}
					/>
				);
			case Step.CELEBRATION:
				return (
					<CelebrationStepForm
						value={habitIn.celebration}
						setHabitIn={setHabitIn}
						onNext={onNext}
						onPrevious={onPrevious}
						onSave={handleSave}
					/>
				);
			case Step.REHEARSAL:
				return <RehearsalStepForm setHabitIn={setHabitIn} onClose={onClose} habitIn={habitIn} />;
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
