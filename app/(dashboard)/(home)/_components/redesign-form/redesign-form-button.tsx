import { useState } from "react";

import { RedesignForm } from "@/app/(dashboard)/(home)/_components/redesign-form/redesign-form";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { TodayHabitUI } from "@/lib/habits/type";

type RedesignFormButtonProps = ButtonProps & {
	habit: TodayHabitUI;
};

export function RedesignFormButton({ habit, children, ...props }: RedesignFormButtonProps) {
	const [open, setOpen] = useState(true);
	return (
		<>
			<Button {...props} onClick={() => setOpen(true)}>
				{children}
			</Button>
			<DrawerDialog open={open} setOpen={setOpen}>
				<RedesignForm habit={habit} onClose={() => setOpen(false)} />
			</DrawerDialog>
		</>
	);
}
