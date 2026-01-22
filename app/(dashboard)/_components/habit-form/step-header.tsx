import React from "react";

import { motion } from "framer-motion";
import { XIcon } from "lucide-react";

import { RehearsalProgressBar } from "@/app/(dashboard)/_components/habit-form/rehearsal-step/rehearsal-progress-bar";
import { steps } from "@/app/(dashboard)/_components/service";
import { cn } from "@/lib/utils";

type HeaderProps = {
	currentStepIndex: number;
	onClose: () => void;
	rehearsalCount: number;
};

export function StepHeader({ rehearsalCount, currentStepIndex, onClose }: HeaderProps) {
	const step = steps[currentStepIndex];
	const StepIcon = step.icon;
	return (
		<div className={cn(step.bgColor, "relative border-b bg-linear-to-br p-6")}>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-stone-500 transition-colors hover:bg-white hover:text-stone-700"
			>
				<XIcon className="h-4 w-4" />
			</button>

			{/* Steps Progress Bar */}
			<div className="mb-6 flex gap-2">
				{steps.map((s, idx) => (
					<div
						key={s.id}
						className={cn(
							step.color,
							"h-1.5 flex-1 rounded-full transition-all",
							idx <= currentStepIndex ? "bg-linear-to-r" : "bg-stone-200",
						)}
					/>
				))}
			</div>

			{step.id === "rehearsal" && <RehearsalProgressBar rehearsalCount={rehearsalCount} />}

			{/* Step Title & Icon */}
			<div className="flex items-center gap-4">
				<motion.div
					key={currentStepIndex}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className={`h-14 w-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg`}
				>
					<StepIcon className="h-7 w-7 text-white" />
				</motion.div>
				<div>
					<p className="mb-1 text-xs tracking-wide text-stone-500 uppercase">
						Step {currentStepIndex + 1} of {steps.length}
					</p>
					<div className="text-xl font-bold text-stone-800">{step.title}</div>
				</div>
			</div>
		</div>
	);
}
