import React from "react";

import { motion } from "framer-motion";
import { ZapIcon } from "lucide-react";

import { REHEARSAL_TARGET } from "@/app/(dashboard)/_components/service";
import { Brain2Icon } from "@/components/file";
import { HabitPrefix, HabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type HabitSummaryProps = {
	habit: HabitUI;
};

export function RehearsalPanel({ habit }: HabitSummaryProps) {
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
					<Brain2Icon
						className="size-22 transition-all duration-1000"
						// The skeleton of the habit: gets darker and stronger
						linesClass={cn(
							"transition-colors duration-700",
							habit.rehearsalCount === 0 && "fill-violet-400",
							habit.rehearsalCount >= 1 && habit.rehearsalCount <= 3 && "fill-violet-400",
							habit.rehearsalCount >= 4 && "fill-violet-800",
						)}
						// The "Synapses": they start firing early and get bright
						dotsClass={cn(
							"transition-colors duration-500",
							habit.rehearsalCount === 0 && "fill-slate-300",
							habit.rehearsalCount >= 1 && "fill-fuchsia-400 animate-pulse",
						)}
						// Left Side: Building the "Logic" of the habit
						leftSideClass={cn(
							"transition-colors duration-1000",
							habit.rehearsalCount < 2 && "fill-slate-100",
							habit.rehearsalCount === 2 && "fill-violet-200",
							habit.rehearsalCount === 3 && "fill-violet-300",
							habit.rehearsalCount >= 4 && "fill-violet-500",
						)}
						// Right Side: Building the "Intuition/Flow"
						rightSideClass={cn(
							"transition-colors duration-1000",
							habit.rehearsalCount < 3 && "fill-slate-50",
							habit.rehearsalCount === 3 && "fill-purple-200",
							habit.rehearsalCount === 4 && "fill-purple-400",
							habit.rehearsalCount === 5 && "fill-purple-600",
						)}
					/>

					{/* Neural connections dots */}
					{[...Array(Math.min(habit.rehearsalCount + 1, REHEARSAL_TARGET))].map((_, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, scale: 0 }}
							animate={{
								opacity: [0, 1, 0],
								scale: [0.5, 1, 0.5],
								// Animate the distance (radius) from 60px out to 20px in
								x: [Math.cos(i * 1.3) * 60, Math.cos(i * 1.3) * 25],
								y: [Math.sin(i * 1.3) * 60, Math.sin(i * 1.3) * 25],
							}}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								delay: i * 0.3, // Keeps them from appearing all at once
								ease: "easeOut",
							}}
							className="absolute"
						>
							<ZapIcon className="size-4 fill-violet-500 text-violet-500" />
						</motion.div>
					))}
				</motion.div>
			</div>

			<div className="space-y-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
				<p className="font-semibold text-purple-900">Rehearse the full sequence:</p>
				<ol className="space-y-2 text-sm text-purple-800">
					<li className="flex items-start gap-2">
						<span className="font-bold">1.</span>
						<span>
							<strong>Anchor: </strong>
							{HabitPrefix.anchor} {habit.anchor}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">2.</span>
						<span>
							<strong>Behavior: </strong>
							{HabitPrefix.tinyBehavior} {habit.tinyBehavior}
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="font-bold">3.</span>
						<span>
							<strong>Celebrate: </strong>
							{HabitPrefix.celebration} {habit.celebration}
						</span>
					</li>
				</ol>
			</div>
		</>
	);
}
