import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDownIcon, Coffee, LucideIcon, Moon, Sun } from "lucide-react";

import { Category } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-library";
import { HabitPrefix } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG: Record<
	Category,
	{ icon: LucideIcon; iconColor: string; containerColor: string }
> = {
	morning: {
		icon: Sun,
		iconColor: "bg-amber-200 text-amber-500 dark:bg-amber-300 dark:text-amber-600",
		containerColor:
			"from-amber-50 to-orange-50 border-amber-200 dark:from-amber-100 dark:to-orange-100 dark:border-amber-300",
	},
	meals: {
		icon: Coffee,
		iconColor: "bg-emerald-200 text-emerald-500 dark:bg-emerald-300 dark:text-emerald-600",
		containerColor:
			"from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-100 dark:to-teal-100 dark:border-emerald-300",
	},
	work: {
		icon: Briefcase,
		iconColor: "bg-indigo-200 text-indigo-500 dark:bg-indigo-300 dark:text-indigo-600",
		containerColor:
			"from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-100 dark:to-indigo-100 dark:border-blue-300",
	},
	evening: {
		icon: Moon,
		iconColor: "bg-violet-200 text-violet-500 dark:bg-violet-300 dark:text-violet-600",
		containerColor:
			"from-violet-50 to-purple-50 border-violet-200 dark:from-violet-100 dark:to-purple-100 dark:border-violet-300",
	},
};

type CategorySectionProps = {
	category: Category;
	items: string[];
	selectedValue: string;
	isExpanded: boolean;
	onToggle: () => void;
	onSelect: (val: string, cat: string) => void;
};

export function AnchorCategorySection({
	category,
	items,
	selectedValue,
	isExpanded,
	onToggle,
	onSelect,
}: CategorySectionProps) {
	const { icon: Icon, containerColor, iconColor } = CATEGORY_CONFIG[category];

	return (
		<motion.div
			layout
			className={cn("overflow-hidden rounded-2xl border bg-linear-to-br", containerColor)}
		>
			<button
				onClick={onToggle}
				className="flex w-full items-center justify-between p-4 outline-none"
			>
				<div className="flex items-center gap-3">
					<div className={cn("flex size-10 items-center justify-center rounded-xl", iconColor)}>
						<Icon className="size-5" />
					</div>
					<div className="text-left">
						<p className="font-medium text-stone-800 capitalize">{category}</p>
						<p className="text-xs text-stone-500">{items.length} anchors</p>
					</div>
				</div>
				<motion.div
					animate={{ rotate: isExpanded ? 180 : 0 }}
					className={cn("flex items-center justify-center rounded-full p-1", iconColor)}
				>
					<ChevronDownIcon className="size-4" />
				</motion.div>
			</button>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="overflow-hidden"
					>
						<div className="space-y-2 p-4">
							{items.map((anchor, index) => (
								<motion.button
									key={index}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.03 }}
									onClick={() => onSelect(anchor, category)}
									className={cn(
										"w-full rounded-xl p-3 text-left text-sm transition-all",
										selectedValue === anchor
											? "bg-white text-stone-900 shadow-md ring-2 ring-emerald-400"
											: "bg-white/70 text-stone-700 hover:bg-white hover:shadow-sm",
									)}
								>
									<span className="font-medium text-emerald-600">{HabitPrefix.anchor} </span>
									{anchor}
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
