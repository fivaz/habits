import React, { useState } from "react";

import { motion } from "framer-motion";
import { BookOpen, Plus, Sparkles } from "lucide-react";

import { HabitForm } from "@/app/(dashboard)/(home)/_components/habit-form/habit-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ABC_ITEMS = [
	{
		letter: "A",
		badgeClass: "bg-blue-100 text-blue-600",
		title: "Anchor (Prompt)",
		description: "An existing routine that triggers your new behavior",
	},
	{
		letter: "B",
		badgeClass: "bg-emerald-100 text-emerald-600",
		title: "Tiny Behavior",
		description: "A super small action (under 30 seconds) that's easy to do",
	},
	{
		letter: "C",
		badgeClass: "bg-amber-100 text-amber-600",
		title: "Celebration",
		description: "An immediate positive emotion that wires the habit in",
	},
];

export function Onboarding() {
	const [openForm, setOpenForm] = useState(false);
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="py-16 text-center"
			>
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-100 to-green-100">
					<Sparkles className="h-10 w-10 text-emerald-500" />
				</div>
				<h2 className="text-foreground mb-2 text-2xl font-bold">Start Your First Tiny Habit</h2>
				<p className="mx-auto mb-6 max-w-xs text-stone-500 dark:text-stone-300">
					Tiny habits are the foundation of big change. Let's create your first ABC recipe!
				</p>
				<Button
					onClick={() => setOpenForm(true)}
					className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-200"
				>
					<Plus className="mr-2 h-5 w-5" />
					Create Your First Recipe
				</Button>

				{/* Restored Learn More Section */}
				<div className="bg-background border-border mt-12 rounded-2xl border p-6 text-left">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
							<BookOpen className="h-5 w-5 text-amber-600" />
						</div>
						<h3 className="text-foreground font-bold">What is B=MAP?</h3>
					</div>
					<p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
						BJ Fogg's Behavior Model: <strong>Behavior = Motivation + Ability + Prompt</strong>
					</p>

					<div className="space-y-3">
						{ABC_ITEMS.map((item) => (
							<div
								key={item.letter}
								className="border-border flex items-start gap-3 rounded-xl border bg-stone-50 p-3 dark:bg-gray-700"
							>
								<span
									className={cn(
										"flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
										item.badgeClass,
									)}
								>
									{item.letter}
								</span>
								<div>
									<p className="text-foreground font-medium">{item.title}</p>
									<p className="text-muted-foreground text-xs">{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			<HabitForm open={openForm} setOpen={setOpenForm} />
		</>
	);
}
