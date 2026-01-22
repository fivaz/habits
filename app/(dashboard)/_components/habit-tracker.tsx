"use client";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import { HabitCard } from "@/app/(dashboard)/_components/habit-card/habit-card";
import { HabitFormButton } from "@/app/(dashboard)/_components/habit-form/habit-form-button";
import { Onboarding } from "@/app/(dashboard)/_components/onboarding";
import { HeaderPortal } from "@/components/header-portal";
import { useHabitsStore } from "@/hooks/habits-store";

export function HabitTracker() {
	const { items: habits } = useHabitsStore();
	return (
		<>
			<HeaderPortal>
				<HabitFormButton className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white">
					<Plus className="mr-1 h-4 w-4" />
					New Recipe
				</HabitFormButton>
			</HeaderPortal>
			<div className="mx-auto max-w-lg px-4 py-4">
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
		</>
	);
}
