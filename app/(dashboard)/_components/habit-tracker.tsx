"use client";

import React, { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { Coffee, Leaf, Moon, Plus, Sun } from "lucide-react";

import { HabitFormButton } from "@/app/(dashboard)/_components/habit-form-button";
import { Onboarding } from "@/app/(dashboard)/_components/onboarding";
import { RecipeCreator } from "@/app/(dashboard)/example/recipe-creator";

interface HabitRecipe {
	id: string;
	anchor: string;
	tiny_behavior: string;
	celebration: string;
	is_active: boolean;
}

const HabitCard = ({ habit }: { habit: HabitRecipe; [key: string]: unknown }) => (
	<div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
		<h3 className="font-bold">{habit.tiny_behavior}</h3>
	</div>
);

type HabitTrackerProps = {
	habits: HabitRecipe[];
};

export function HabitTracker({ habits }: HabitTrackerProps) {
	const [openRecipeCreator, setOpenRecipeCreator] = useState(false);
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return { text: "Good morning", icon: Sun };
		if (hour < 17) return { text: "Good afternoon", icon: Coffee };
		return { text: "Good evening", icon: Moon };
	};

	const greeting = getGreeting();
	const GreetingIcon = greeting.icon;

	return (
		<div className="min-h-screen bg-linear-to-br from-stone-50 via-white to-emerald-50">
			{/* Header */}
			<div className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur-md">
				<div className="mx-auto max-w-lg px-4 py-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200">
								<Leaf className="h-5 w-5 text-white" />
							</div>
							<div>
								<p className="flex items-center gap-1 text-xs text-stone-500">
									<GreetingIcon className="h-3 w-3" />
									{greeting.text}
								</p>
								<h1 className="text-lg font-bold text-stone-800">Tiny Habits</h1>
							</div>
						</div>
						<HabitFormButton className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white">
							<Plus className="mr-1 h-4 w-4" />
							New Recipe
						</HabitFormButton>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="mx-auto max-w-lg px-4 py-6">
				{habits.length === 0 ? (
					<Onboarding />
				) : (
					<div className="space-y-4">
						<AnimatePresence>
							{habits.map((habit) => (
								<HabitCard key={habit.id} habit={habit} />
							))}
						</AnimatePresence>
					</div>
				)}
			</div>
		</div>
	);
}
