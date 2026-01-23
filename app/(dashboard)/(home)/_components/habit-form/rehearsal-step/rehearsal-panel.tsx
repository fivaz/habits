import React from "react";

import { motion } from "framer-motion";
import { ZapIcon } from "lucide-react";

import { RehearsalBrainIcon } from "@/components/file";
import { HabitPrefix, HabitUI, REHEARSAL_TARGET } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type HabitSummaryProps = {
	habit: HabitUI;
};

export function RehearsalPanel({ habit }: HabitSummaryProps) {
	return (
		<div className="flex rounded-xl border border-purple-200 bg-purple-50 p-4 dark:bg-purple-100">
			<div className="space-y-3">
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
			<div className="relative mx-auto">
				<motion.div
					animate={{
						scale: [1, 1.05, 1],
						opacity: [0.8, 1, 0.8],
					}}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-violet-100 dark:from-purple-200 dark:to-violet-200"
				>
					<RehearsalBrainAnimation habit={habit} />

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
		</div>
	);
}

type ClassMap = Record<number, string>;

const linesMap: ClassMap = {
	0: "fill-violet-400",
	1: "fill-violet-500",
	2: "fill-violet-600",
	3: "fill-violet-700",
	4: "fill-violet-800",
	5: "fill-violet-900",
};

const dotsMap: ClassMap = {
	0: "fill-slate-300",
	1: "fill-fuchsia-400",
	2: "fill-fuchsia-400",
	3: "fill-fuchsia-400",
	4: "fill-fuchsia-400",
	5: "fill-fuchsia-400",
};

const leftSideMap: ClassMap = {
	0: "fill-slate-50", // baseline
	1: "fill-violet-200", // first activation
	2: "fill-violet-300", // stronger
	3: "fill-violet-400", // stronger again
	4: "fill-violet-500", // near peak
	5: "fill-violet-600", // peak
};

const rightSideMap: ClassMap = {
	0: "fill-slate-50", // baseline
	1: "fill-slate-50", // waiting
	2: "fill-purple-200", // first compensation
	3: "fill-purple-300", // catches up
	4: "fill-purple-400", // stronger
	5: "fill-purple-600", // peak
};

type RehearsalBrainAnimationProps = {
	habit: HabitUI;
};

function RehearsalBrainAnimation({ habit }: RehearsalBrainAnimationProps) {
	function classFromMap(
		count: number,
		map: ClassMap,
		fallbackCount = Math.max(...Object.keys(map).map(Number)),
	) {
		return map[count] ?? map[fallbackCount];
	}

	return (
		<RehearsalBrainIcon
			className="size-22 transition-all duration-1000"
			linesClass={cn(
				"transition-colors duration-700",
				classFromMap(habit.rehearsalCount, linesMap),
			)}
			dotsClass={cn("transition-colors duration-500", classFromMap(habit.rehearsalCount, dotsMap))}
			leftSideClass={cn(
				"transition-colors duration-1000",
				classFromMap(habit.rehearsalCount, leftSideMap),
			)}
			rightSideClass={cn(
				"transition-colors duration-1000",
				classFromMap(habit.rehearsalCount, rightSideMap),
			)}
		/>
	);
}
