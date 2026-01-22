import { useState } from "react";

import { HabitForm } from "@/app/(dashboard)/_components/habit-form/habit-form";
import { Step } from "@/app/(dashboard)/_components/service";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { getEmptyHabit, TodayHabitUI } from "@/lib/habits/type";

type HabitFormButtonProps = ButtonProps & {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	habit?: TodayHabitUI;
	startStep?: number;
};

export function HabitFormButton({
	open: externalOpen,
	onOpenChange: setExternalOpen,
	habit = getEmptyHabit(),
	startStep = Step.ANCHOR,
	children,
	...props
}: HabitFormButtonProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const open = externalOpen ?? internalOpen;
	const setOpen = setExternalOpen ?? setInternalOpen;

	return (
		<>
			{!setExternalOpen && (
				<Button onClick={() => setOpen(true)} {...props}>
					{children}
				</Button>
			)}
			<DrawerDialog open={open} setOpen={setOpen}>
				<HabitForm startStep={startStep} habit={habit} onClose={() => setOpen(false)} />
			</DrawerDialog>
		</>
	);
}
