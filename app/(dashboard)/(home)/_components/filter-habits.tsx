import React, { useMemo } from "react";

import { AnchorCategoryUI, getColorClass, ICONS } from "@/lib/category/type";
import { TodayHabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type FilterHabitsProps = {
	habits: TodayHabitUI[];
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
};

export function FilterHabits({ habits, selectedCategory, onSelectCategory }: FilterHabitsProps) {
	const categories = useMemo<AnchorCategoryUI[]>(() => {
		const map: Record<string, AnchorCategoryUI> = {};

		habits.forEach((h) => (map[h.anchorCategory.name] = h.anchorCategory));

		return [
			{
				id: "all",
				name: "all",
				order: -1,
				color: "stone",
				icon: "FunnelX",
				isActive: true,
			},
			...Object.values(map).toSorted((a, b) => a.order - b.order),
		];
	}, [habits]);

	return (
		<div className="flex gap-2 overflow-x-auto">
			{categories.map((cat) => {
				const CategoryIcon = ICONS[cat.icon] || ICONS.Sun;
				const classes = getColorClass(cat.color);

				const isSelected = selectedCategory === cat.name;

				return (
					<button
						key={cat.name}
						type="button"
						onClick={() => onSelectCategory(cat.name)}
						className={cn(
							"flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors",
							isSelected ? classes.accent : classes.background,
							classes.text,
							classes.border,
						)}
					>
						<CategoryIcon className="h-3 w-3" />
						{cat.name}
					</button>
				);
			})}
		</div>
	);
}
