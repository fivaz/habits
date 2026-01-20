import React from "react";

import { motion } from "framer-motion";
import { BookOpen, Plus, Sparkles } from "lucide-react";

import { HabitFormButton } from "@/app/(dashboard)/_components/habit-form-button";

export function Onboarding() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="py-16 text-center"
		>
			<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-100 to-green-100">
				<Sparkles className="h-10 w-10 text-emerald-500" />
			</div>
			<h2 className="mb-2 text-2xl font-bold text-stone-800">Start Your First Tiny Habit</h2>
			<p className="mx-auto mb-6 max-w-xs text-stone-500">
				Tiny habits are the foundation of big change. Let's create your first ABC recipe!
			</p>
			<HabitFormButton className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200">
				<Plus className="mr-2 h-5 w-5" />
				Create Your First Recipe
			</HabitFormButton>

			{/* Restored Learn More Section */}
			<div className="mt-12 rounded-2xl border border-stone-200 bg-white p-6 text-left">
				<div className="mb-4 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
						<BookOpen className="h-5 w-5 text-amber-600" />
					</div>
					<h3 className="font-bold text-stone-800">What is B=MAP?</h3>
				</div>
				<p className="mb-4 text-sm text-stone-600">
					BJ Fogg's Behavior Model: <strong>Behavior = Motivation + Ability + Prompt</strong>
				</p>

				<div className="space-y-3">
					<div className="flex items-start gap-3 rounded-xl bg-stone-50 p-3">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
							A
						</span>
						<div>
							<p className="font-medium text-stone-700">Anchor (Prompt)</p>
							<p className="text-xs text-stone-500">
								An existing routine that triggers your new behavior
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3 rounded-xl bg-stone-50 p-3">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
							B
						</span>
						<div>
							<p className="font-medium text-stone-700">Tiny Behavior</p>
							<p className="text-xs text-stone-500">
								A super small action (under 30 seconds) that's easy to do
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3 rounded-xl bg-stone-50 p-3">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
							C
						</span>
						<div>
							<p className="font-medium text-stone-700">Celebration</p>
							<p className="text-xs text-stone-500">
								An immediate positive emotion that wires the habit in
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
