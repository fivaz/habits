import React, { Dispatch, SetStateAction, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

import { AnchorSuggestions } from "@/app/(dashboard)/_components/anchor-suggestions";
import { CelebrationSuggestions } from "@/app/(dashboard)/_components/celebration-suggestions";
import { ReHearsalPanel } from "@/app/(dashboard)/_components/re-hearsal-panel";
import { HabitUI, steps } from "@/app/(dashboard)/_components/service";
import { DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type StepFormBodyProps = {
	currentStepIndex: number;
	habit: HabitUI;
	setHabit: Dispatch<SetStateAction<HabitUI>>;
	rehearsalCount: number;
};

export function StepFormBody({
	rehearsalCount,
	currentStepIndex,
	setHabit,
	habit,
}: StepFormBodyProps) {
	const step = steps[currentStepIndex];

	const value = habit[step.id];

	const setValue = (value: string) => {
		setHabit((prev) => ({ ...prev, [step.id]: value }));
	};

	return (
		<div className="flex-1 overflow-y-auto p-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentStepIndex}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					className="space-y-4"
				>
					<DialogDescription className="text-stone-600">{step.subtitle}</DialogDescription>

					{step.id === "anchor" && (
						<AnchorSuggestions
							currentStepIndex={currentStepIndex}
							value={value}
							setValue={setValue}
						/>
					)}

					<div className="relative">
						<div
							className={cn(
								step.color,
								`absolute top-4 left-4 bg-linear-to-r bg-clip-text text-sm font-semibold text-transparent`,
							)}
						>
							{step.prefix}
						</div>

						{step.id !== "rehearsal" && (
							<Textarea
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder={step.placeholder}
								className="min-h-30 rounded-2xl border-stone-200 pt-10 text-lg focus:border-emerald-400 focus:ring-emerald-400"
							/>
						)}

						{step.id === "rehearsal" && (
							<ReHearsalPanel rehearsalCount={rehearsalCount} habit={habit} />
						)}
					</div>

					{step.id === "celebration" && (
						<CelebrationSuggestions value={value} setValue={setValue} />
					)}

					<div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3">
						<Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
						<p className="text-sm text-stone-600">{step.tip}</p>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
