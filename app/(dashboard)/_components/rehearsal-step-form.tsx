import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Repeat } from "lucide-react";

import { RehearsalPanel } from "@/app/(dashboard)/_components/rehearsal-panel";
import { HabitUI, REHEARSAL_TARGET, Step, steps } from "@/app/(dashboard)/_components/service";
import { StepTip } from "@/app/(dashboard)/_components/step-body";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";

type RehearsalStepFormProps = {
	onRehearse: () => void;
	rehearsalCount: number;
	habit: HabitUI;
};

export function RehearsalStepForm({ habit, rehearsalCount, onRehearse }: RehearsalStepFormProps) {
	const step = steps[0];
	return (
		<div className="flex-1 overflow-y-auto p-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={Step.REHEARSAL}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					className="space-y-4"
				>
					<DialogDescription className="text-stone-600">{step.subtitle}</DialogDescription>

					<RehearsalPanel rehearsalCount={rehearsalCount} habit={habit} />

					<StepTip step={step} />

					<motion.div whileTap={{ scale: 0.95 }} className="pt-2">
						<Button
							onClick={onRehearse}
							className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-violet-600 py-8 text-lg text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
						>
							<Repeat className="mr-2 h-6 w-6" />
							{rehearsalCount === REHEARSAL_TARGET - 1
								? "Complete Final Rehearsal!"
								: `I Rehearsed It! (${rehearsalCount + 1}/${REHEARSAL_TARGET})`}
						</Button>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
