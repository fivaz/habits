import React, { useState } from "react";

import { motion } from "framer-motion";

import { categoryColors, categoryIcons } from "@/lib/category/type";
import { HabitUI } from "@/lib/habits/type";

type HabitCardProps = {
	habit: HabitUI;
};

export function HabitCard({ habit }: HabitCardProps) {
	const [isPressed, setIsPressed] = useState(false);
	const CategoryIcon = categoryIcons[habit.anchorCategory];

	// TODO implement it later with the logs table
	const isCompletedToday = false;

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
				isCompletedToday ? "border-emerald-300 bg-emerald-50/50" : "border-stone-200"
			}`}
		>
			{/* Category Badge */}
			<div
				className={`absolute top-4 right-4 rounded-full bg-linear-to-r px-2.5 py-1 ${categoryColors[habit.anchorCategory]} flex items-center gap-1.5`}
			>
				<CategoryIcon className="h-3 w-3" />
				<span className="text-xs font-medium capitalize">{habit.anchorCategory}</span>
			</div>

			<div className="p-5">
				{/* ABC Recipe */}
				<div className="mb-5 space-y-3 pr-20">
					{/* Anchor */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-500">
							A
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Anchor</p>
							<p className="font-medium text-stone-700">{habit.anchor}</p>
						</div>
					</div>

					{/* Behavior */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
							B
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Tiny Behavior</p>
							<p className="font-semibold text-stone-800">{habit.tinyBehavior}</p>
						</div>
					</div>

					{/* Celebration */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
							C
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Celebration</p>
							<p className="text-amber-700">{habit.celebration}</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
