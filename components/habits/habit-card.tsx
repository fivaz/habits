// @ts-nocheck
import React, { useState } from "react";

import { motion } from "framer-motion";
import {
	Briefcase,
	Check,
	Coffee,
	Edit,
	Flame,
	Moon,
	MoreVertical,
	RefreshCw,
	Sun,
	Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HabitRecipe } from "@/components/habits/data/habits";

const categoryIcons = {
	morning: Sun,
	meals: Coffee,
	work: Briefcase,
	evening: Moon,
	other: Sun,
};

const categoryColors = {
	morning: "from-amber-100 to-orange-100 text-amber-700",
	meals: "from-emerald-100 to-teal-100 text-emerald-700",
	work: "from-blue-100 to-indigo-100 text-blue-700",
	evening: "from-violet-100 to-purple-100 text-violet-700",
	other: "from-stone-100 to-stone-200 text-stone-600",
};

export default function HabitCard({
	habit,
	isCompletedToday,
	onComplete,
	onRedesign,
	onEdit,
	onDelete,
}) {
	const [isPressed, setIsPressed] = useState(false);
	const CategoryIcon = categoryIcons[habit.anchor_category || "other"];
	const [celebratingHabit, setCelebratingHabit] = useState(null);

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
				className={`absolute top-4 right-4 rounded-full bg-linear-to-r px-2.5 py-1 ${categoryColors[habit.anchor_category || "other"]} flex items-center gap-1.5`}
			>
				<CategoryIcon className="h-3 w-3" />
				<span className="text-xs font-medium capitalize">{habit.anchor_category || "other"}</span>
			</div>

			<div className="p-5">
				{/* ABC Recipe */}
				<div className="mb-5 space-y-3 pr-20">
					{/* Anchor */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-500">
							A
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Anchor</p>
							<p className="font-medium text-stone-700">{habit.anchor}</p>
						</div>
					</div>

					{/* Behavior */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
							B
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Tiny Behavior</p>
							<p className="font-semibold text-stone-800">{habit.tiny_behavior}</p>
						</div>
					</div>

					{/* Celebration */}
					<div className="flex items-start gap-2">
						<span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
							C
						</span>
						<div>
							<p className="text-xs tracking-wide text-stone-400 uppercase">Celebration</p>
							<p className="text-amber-700">{habit.celebration}</p>
						</div>
					</div>
				</div>

				{/* Stats Row */}
				{habit.streak > 0 && (
					<div className="mb-4 flex items-center gap-4 rounded-xl border border-stone-100 bg-stone-50 p-3">
						<div className="flex items-center gap-1.5">
							<Flame className="h-4 w-4 text-orange-500" />
							<span className="text-sm font-semibold text-stone-700">{habit.streak}</span>
							<span className="text-xs text-stone-500">day streak</span>
						</div>
						<div className="h-4 w-px bg-stone-200" />
						<div className="text-xs text-stone-500">{habit.total_completions || 0} total</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className="flex items-center gap-2">
					{isCompletedToday ? (
						<div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-100 py-3 font-medium text-emerald-700">
							<Check className="h-5 w-5" />
							Done for today!
						</div>
					) : (
						<>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onMouseDown={() => setIsPressed(true)}
								onMouseUp={() => setIsPressed(false)}
								onMouseLeave={() => setIsPressed(false)}
								onClick={onComplete}
								className="relative flex-1 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-green-600 py-3 font-medium text-white shadow-md shadow-emerald-200 transition-all hover:shadow-lg hover:shadow-emerald-300"
							>
								<motion.div
									animate={{ scale: isPressed ? 1.5 : 1, opacity: isPressed ? 0.3 : 0 }}
									className="absolute inset-0 rounded-xl bg-white"
								/>
								<span className="relative flex items-center justify-center gap-2">
									<Check className="h-5 w-5" />I did it!
								</span>
							</motion.button>

							<Button
								variant="outline"
								onClick={onRedesign}
								className="rounded-xl border-stone-200 px-4 py-3 text-stone-600 hover:bg-stone-50"
							>
								<RefreshCw className="h-4 w-4" />
							</Button>
						</>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-xl text-stone-400 hover:text-stone-600"
							>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="rounded-xl">
							<DropdownMenuItem onClick={onEdit} className="gap-2">
								<Edit className="h-4 w-4" />
								Edit Recipe
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={onDelete}
								className="gap-2 text-rose-600 focus:text-rose-600"
							>
								<Trash2 className="h-4 w-4" />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</motion.div>
	);
}
