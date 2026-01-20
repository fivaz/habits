import React from "react";

import { motion } from "framer-motion";
import { Brain, Lightbulb, Repeat } from "lucide-react";

import { HabitFormData, StepConfig } from "@/app/(dashboard)/example/recipe-dialog";
import { Button } from "@/components/ui/button";

/**
 * 2. RehearsalView
 * Handles the complex brain animation and logic specific to the rehearsal step.
 */
export const RehearsalView = ({
	step,
	formData,
	rehearsalCount,
	rehearsalTarget,
	onRehearse,
}: {
	step: StepConfig;
	formData: HabitFormData;
	rehearsalCount: number;
	rehearsalTarget: number;
	onRehearse: () => void;
}) => {
	return (
		<>
			<p className="text-stone-600">{step.subtitle}</p>

			{/* Brain Connection Visualization */}
			<div className="relative py-8">
				<motion.div
					animate={{
						scale: [1, 1.05, 1],
						opacity: [0.5, 1, 0.5],
					}}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-violet-100"
				>
					<Brain className="h-16 w-16 text-purple-600" />
					{/* Neural connections dots */}
					{[...Array(Math.min(rehearsalCount + 1, 5))].map((_, i) => (
						<motion.div
							key={i}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: i * 0.1 }}
							className="absolute h-2 w-2 rounded-full bg-purple-400"
							style={{
								top: `${20 + Math.sin(i * 1.3) * 40}%`,
								left: `${20 + Math.cos(i * 1.3) * 40}%`,
							}}
						/>
					))}
				</motion.div>
			</div>

			{/* Sequence Summary */}
			<div className="space-y-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
				<p className="font-semibold text-purple-900">Rehearse the full sequence:</p>
				<ol className="space-y-2 text-sm text-purple-800">
					<li className="flex items-start gap-2">
						<span className="font-bold">1.</span>
						<span>
							<strong>Anchor:</strong> {formData.anchor}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">2.</span>
						<span>
							<strong>Behavior:</strong> {formData.tiny_behavior}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">3.</span>
						<span>
							<strong>Celebrate:</strong> {formData.celebration}
						</span>
					</li>
				</ol>
			</div>

			<div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3">
				<Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
				<p className="text-sm text-stone-600">{step.tip}</p>
			</div>

			<motion.div whileTap={{ scale: 0.95 }} className="pt-2">
				<Button
					onClick={onRehearse}
					className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-violet-600 py-8 text-lg text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
				>
					<Repeat className="mr-2 h-6 w-6" />
					{rehearsalCount === rehearsalTarget - 1
						? "Complete Final Rehearsal!"
						: `I Rehearsed It! (${rehearsalCount + 1}/${rehearsalTarget})`}
				</Button>
			</motion.div>
		</>
	);
};
