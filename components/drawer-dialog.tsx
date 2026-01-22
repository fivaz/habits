import { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ButtonProps } from "@/components/ui/button";

type DrawerDialogProps = ButtonProps & {
	open: boolean;
	setOpen: (open: boolean) => void;
	children: ReactNode;
};

export function DrawerDialog({ children, open, setOpen }: DrawerDialogProps) {
	return (
		<>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
						onClick={() => setOpen(false)}
					>
						<motion.div
							initial={{ y: "100%", opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: "100%", opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							onClick={(e) => e.stopPropagation()}
							className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
						>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
