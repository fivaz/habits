import React from "react";

import { categoryColors, categoryIcons } from "@/lib/category/type";
import { HabitPrefix, HabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type HabitSummaryProps = {
	habit: HabitUI;
};

export function HabitSummary({ habit }: HabitSummaryProps) {
	const CategoryIcon = categoryIcons[habit.anchorCategory];

	return (
		<>
			{/* Category Badge */}
			<div
				className={cn(
					categoryColors[habit.anchorCategory],
					"absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-linear-to-r px-2.5 py-1",
				)}
			>
				<CategoryIcon className="h-3 w-3" />
				<span className="text-xs font-medium capitalize">{habit.anchorCategory}</span>
			</div>

			{/* ABC Recipe */}
			<div className="mb-5 space-y-3 pr-20">
				{/* Anchor */}
				<div className="flex items-start gap-2">
					<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-500">
						A
					</span>
					<div>
						<p className="text-xs tracking-wide text-stone-400 uppercase">Anchor</p>
						<p className="font-medium text-stone-700">
							{HabitPrefix.anchor} {habit.anchor}
						</p>
					</div>
				</div>

				{/* Behavior */}
				<div className="flex items-start gap-2">
					<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
						B
					</span>
					<div>
						<p className="text-xs tracking-wide text-stone-400 uppercase">Tiny Behavior</p>
						<p className="font-semibold text-stone-800">
							{HabitPrefix.tinyBehavior} {habit.tinyBehavior}
						</p>
					</div>
				</div>

				{/* Celebration */}
				<div className="flex items-start gap-2">
					<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
						C
					</span>
					<div>
						<p className="text-xs tracking-wide text-stone-400 uppercase">Celebration</p>
						<p className="text-amber-700">
							{HabitPrefix.celebration} {habit.celebration}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
