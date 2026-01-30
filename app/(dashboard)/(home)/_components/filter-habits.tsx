import React, { useMemo, useState } from "react";

import { AnchorCategoryUI, COLOR_MAP, ColorName, ICONS } from "@/lib/category/type";
import { TodayHabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type FilterHabitsProps = {
	habits: TodayHabitUI[];
	onFilter: (filtered: TodayHabitUI[]) => void;
};

export function FilterHabits({ habits, onFilter }: FilterHabitsProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	// Compute unique categories from habits + defaultAnchorCategory fallback
	const categories = useMemo(() => {
		const map: Record<string, AnchorCategoryUI> = {};
		habits.forEach((h) => {
			const cat = h.anchorCategory;
			map[cat.name] = cat;
		});
		const arr = [
			{ name: "all", order: -1, color: "bg-gray-200 text-gray-700", icon: "FunnelX" },
			...Object.values(map),
		];
		return arr.sort((a, b) => a.order - b.order);
	}, [habits]);

	// Filter & sort habits based on selected category
	const filterAndSort = (category: string) => {
		const filtered =
			category === "all" ? habits : habits.filter((h) => h.anchorCategory.name === category);

		return filtered.sort((a, b) => a.anchorCategory.order - b.anchorCategory.order);
	};

	const handleClickCategory = (category: string) => {
		setSelectedCategory(category);
		onFilter(filterAndSort(category));
	};

	return (
		<div className="flex gap-2 overflow-x-auto">
			{categories.map((cat) => {
				const CategoryIcon = ICONS[cat.icon] || ICONS.Sun;
				const classes = COLOR_MAP[cat.color as ColorName] || COLOR_MAP.stone;

				return (
					<div
						key={cat.name}
						onClick={() => handleClickCategory(cat.name)}
						className={cn(
							"flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors",
							selectedCategory === cat.name ? classes.accent : classes.background,
							classes.text,
							classes.border,
						)}
					>
						<CategoryIcon className="h-3 w-3" />
						{cat.name}
					</div>
				);
			})}
		</div>
	);
}
