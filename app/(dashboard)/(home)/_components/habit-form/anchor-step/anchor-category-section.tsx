import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

import { AnchorCategoryWithSuggestionsUI } from "@/lib/anchor-suggestions/type";
import { AnchorCategoryUI, getColorClass, ICONS } from "@/lib/category/type";
import { HabitPrefix } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type CategorySectionProps = {
	category: AnchorCategoryUI;
	suggestions: AnchorCategoryWithSuggestionsUI["suggestions"];
	selectedValue: string;
	isExpanded: boolean;
	onToggle: () => void;
	onSelect: (val: string, catId: string) => void;
};

export function AnchorCategorySection({
	category,
	suggestions,
	selectedValue,
	isExpanded,
	onToggle,
	onSelect,
}: CategorySectionProps) {
	const Icon = ICONS[category.icon] ?? ICONS.Sun;
	const classes = getColorClass(category.color);

	return (
		<>
			<motion.div
				layout
				className={cn(
					"overflow-hidden rounded-2xl border bg-linear-to-br",
					classes.background,
					classes.text,
					classes.border,
				)}
			>
				<button
					onClick={onToggle}
					className="flex w-full items-center justify-between p-4 outline-none"
				>
					<div className="flex items-center gap-3">
						<div
							className={cn("flex size-10 items-center justify-center rounded-xl", classes.accent)}
						>
							<Icon className="size-5" />
						</div>
						<div className="text-left">
							<p className="font-medium text-stone-800 capitalize">{category.name}</p>
							<p className="text-xs text-stone-500">{suggestions.length} anchors</p>
						</div>
					</div>
					<motion.div
						animate={{ rotate: isExpanded ? 180 : 0 }}
						className={cn("flex items-center justify-center rounded-full p-1", classes.accent)}
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
								{suggestions.map((anchor, index) => (
									<motion.button
										key={anchor.id}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.03 }}
										onClick={() => onSelect(anchor.text, category.id)}
										className={cn(
											"w-full rounded-xl p-3 text-left text-sm transition-all",
											selectedValue === anchor.text
												? "bg-white text-stone-900 shadow-md ring-2 ring-emerald-400"
												: "bg-white/70 text-stone-700 hover:bg-white hover:shadow-sm",
										)}
									>
										<span className="font-medium text-emerald-600">{HabitPrefix.anchor} </span>
										{anchor.text}
									</motion.button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
}
