import { useState } from "react";

import { HabitForm } from "@/app/(dashboard)/(home)/_components/habit-form/habit-form";
import { RedesignForm } from "@/app/(dashboard)/(home)/_components/redesign-form/redesign-form";
import { Step } from "@/app/(dashboard)/(home)/_components/service";
import { DrawerDialog } from "@/components/drawer-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { TodayHabitUI } from "@/lib/habits/type";

type RedesignFormButtonProps = ButtonProps & {
	habit: TodayHabitUI;
};

export function RedesignFormButton({ habit, children, ...props }: RedesignFormButtonProps) {
	const [openRedesign, setOpenRedesign] = useState(false);
	const [openRehearsal, setOpenRehearsal] = useState(false);
	return (
		<>
			<Button {...props} onClick={() => setOpenRedesign(true)}>
				{children}
			</Button>
			<DrawerDialog open={openRedesign} setOpen={setOpenRedesign}>
				<RedesignForm
					habit={habit}
					onClose={() => {
						setOpenRedesign(false);
						setOpenRehearsal(true);
					}}
				/>
			</DrawerDialog>
			<HabitForm
				startStep={Step.REHEARSAL}
				habit={habit}
				open={openRehearsal}
				setOpen={setOpenRehearsal}
			/>
		</>
	);
}
