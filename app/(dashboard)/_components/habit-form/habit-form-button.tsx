import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { HabitForm } from "@/app/(dashboard)/_components/habit-form/habit-form";
import { Step } from "@/app/(dashboard)/_components/service";
import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerOverlay, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
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
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const open = externalOpen ?? internalOpen;
	const setOpen = setExternalOpen ?? setInternalOpen;

	const FormContent = (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ y: "100%", opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: "100%", opacity: 0 }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					className="relative mx-auto flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
				>
					<HabitForm startStep={startStep} habit={habit} onClose={() => setOpen(false)} />
				</motion.div>
			)}
		</AnimatePresence>
	);

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				{!setExternalOpen && (
					<DialogTrigger asChild>
						<Button {...props}>{children}</Button>
					</DialogTrigger>
				)}
				<DialogOverlay className="bg-black/40 backdrop-blur-sm" />
				<DialogContent
					showCloseButton={false}
					forceMount
					className="border-none bg-transparent p-0 shadow-none"
				>
					{FormContent}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{!setExternalOpen && (
				<DrawerTrigger asChild>
					<Button {...props}>{children}</Button>
				</DrawerTrigger>
			)}
			<DrawerOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
			<DrawerContent className="border-none bg-transparent p-0 shadow-none outline-none">
				{FormContent}
			</DrawerContent>
		</Drawer>
	);
}
