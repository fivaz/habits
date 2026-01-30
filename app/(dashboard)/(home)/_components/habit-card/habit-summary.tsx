import React, { useState } from "react";

import { MissingRehearsalBadge } from "@/app/(dashboard)/(home)/_components/habit-card/missing-rehearsal-badge";
import { HabitForm } from "@/app/(dashboard)/(home)/_components/habit-form/habit-form";
import { Step } from "@/app/(dashboard)/(home)/_components/service";
import { ICONS } from "@/lib/category/type";
import { HabitPrefix, REHEARSAL_TARGET, TodayHabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type HabitSummaryProps = {
	habit: TodayHabitUI;
};

export function HabitSummary({ habit }: HabitSummaryProps) {
	const CategoryIcon = ICONS[habit.anchorCategory.icon] || ICONS.Sun;

	const [openEditForm, setOpenEditForm] = useState(false);

	const abcItems = [
		{
			label: "Anchor",
			letter: "A",
			bgColor: "bg-stone-100",
			textColor: "text-stone-500",
			value: `${HabitPrefix.anchor} ${habit.anchor}`,
			valueClass: "font-medium text-stone-700 dark:text-gray-200",
		},
		{
			label: "Tiny Behavior",
			letter: "B",
			bgColor: "bg-emerald-100",
			textColor: "text-emerald-600",
			value: `${HabitPrefix.tinyBehavior} ${habit.tinyBehavior}`,
			valueClass: "font-semibold text-emerald-600",
		},
		{
			label: "Celebration",
			letter: "C",
			bgColor: "bg-amber-100",
			textColor: "text-amber-600",
			value: `${HabitPrefix.celebration} ${habit.celebration}`,
			valueClass: "text-amber-700 dark:text-amber-300",
		},
	];

	return (
		<div className="flex gap-2">
			{/* ABC Recipe */}
			<div className="mb-5 flex-1 space-y-3">
				{abcItems.map((item) => (
					<div key={item.letter} className="flex items-start gap-2">
						<span
							className={cn(
								"flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
								item.bgColor,
								item.textColor,
							)}
						>
							{item.letter}
						</span>
						<div>
							<p className="text-muted-foreground text-xs tracking-wide uppercase">{item.label}</p>
							<p className={item.valueClass}>{item.value}</p>
						</div>
					</div>
				))}
			</div>

			{/* Category Badge */}
			<div className="flex flex-col items-end gap-2">
				<div
					className={cn(
						habit.anchorCategory.color,
						"flex items-center gap-1.5 rounded-full bg-linear-to-r px-2.5 py-1",
					)}
				>
					<CategoryIcon className="h-3 w-3" />
					<span className="text-xs font-medium capitalize">{habit.anchorCategory.name}</span>
				</div>
				{habit.rehearsalCount < REHEARSAL_TARGET && (
					<MissingRehearsalBadge onStartRehearsal={() => setOpenEditForm(true)} />
				)}
			</div>

			<HabitForm
				habit={habit}
				startStep={Step.REHEARSAL}
				open={openEditForm}
				setOpen={setOpenEditForm}
			/>
		</div>
	);
}
