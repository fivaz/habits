"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import { HabitCard } from "@/app/(dashboard)/(home)/_components/habit-card/habit-card";
import { HabitForm } from "@/app/(dashboard)/(home)/_components/habit-form/habit-form";
import { Onboarding } from "@/app/(dashboard)/(home)/_components/onboarding";
import { HeaderPortal } from "@/components/header-portal";
import { Button } from "@/components/ui/button";
import { useHabitsStore } from "@/hooks/habits-store";

export function HabitTracker() {
	const { items: habits } = useHabitsStore();
	const [openForm, setOpenForm] = useState(false);
	return (
		<>
			<HeaderPortal>
				<Button
					onClick={() => setOpenForm(true)}
					className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white"
				>
					<Plus className="mr-1 h-4 w-4" />
					New Recipe
				</Button>
			</HeaderPortal>

			<div className="p-4">
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

			<HabitForm open={openForm} setOpen={setOpenForm} />
		</>
	);
}
