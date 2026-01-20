import React from "react";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

import { HabitUI } from "@/lib/habits/type";

type HabitSummaryProps = {
	habit: HabitUI;
	rehearsalCount: number;
};

export function RehearsalPanel({ rehearsalCount, habit }: HabitSummaryProps) {
	return (
		<>
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

			<div className="space-y-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
				<p className="font-semibold text-purple-900">Rehearse the full sequence:</p>
				<ol className="space-y-2 text-sm text-purple-800">
					<li className="flex items-start gap-2">
						<span className="font-bold">1.</span>
						<span>
							<strong>Anchor:</strong> {habit.anchor}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">2.</span>
						<span>
							<strong>Behavior:</strong> {habit.tinyBehavior}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">3.</span>
						<span>
							<strong>Celebrate:</strong> {habit.celebration}
						</span>
					</li>
				</ol>
			</div>
		</>
	);
}
