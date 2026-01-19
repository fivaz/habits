"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { HabitForm } from "@/app/(dashboard)/_components/habit-form";
import { Button, ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";

export function HabitFormButton({ children, ...props }: ButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button {...props}>{children}</Button>
			</DialogTrigger>

			<DialogOverlay className="bg-black/40 backdrop-blur-sm" />

			<DialogContent
				showCloseButton={false}
				forceMount
				className="border-none bg-transparent p-0 shadow-none"
			>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ y: "100%", opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: "100%", opacity: 0 }}
							transition={{
								type: "spring",
								damping: 25,
								stiffness: 300,
							}}
							className="relative mx-auto flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
						>
							<HabitForm onClose={() => setOpen(false)} />
						</motion.div>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}
