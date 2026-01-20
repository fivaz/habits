import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Coffee, LucideIcon, Moon, Sun } from "lucide-react";

import { Category } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-library";
import { HabitPrefix } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG: Record<Category, { icon: LucideIcon; colors: string }> = {
	morning: { icon: Sun, colors: "from-amber-50 to-orange-50 border-amber-200" },
	meals: { icon: Coffee, colors: "from-emerald-50 to-teal-50 border-emerald-200" },
	work: { icon: Briefcase, colors: "from-blue-50 to-indigo-50 border-blue-200" },
	evening: { icon: Moon, colors: "from-violet-50 to-purple-50 border-violet-200" },
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
	const { icon: Icon, colors } = CATEGORY_CONFIG[category];

	return (
		<motion.div layout className={cn("overflow-hidden rounded-2xl border bg-linear-to-br", colors)}>
			<button
				onClick={onToggle}
				className="flex w-full items-center justify-between p-4 outline-none"
			>
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60">
						<Icon className="h-5 w-5 text-stone-600" />
					</div>
					<div className="text-left">
						<p className="font-medium text-stone-800 capitalize">{category}</p>
						<p className="text-xs text-stone-500">{items.length} anchors</p>
					</div>
				</div>
				<motion.div
					animate={{ rotate: isExpanded ? 180 : 0 }}
					className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60"
				>
					<svg
						className="h-4 w-4 text-stone-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
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
						<div className="space-y-2 px-4 pb-4">
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
											: "bg-white/50 text-stone-700 hover:bg-white hover:shadow-sm",
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
