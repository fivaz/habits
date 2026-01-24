"use client";

import React, { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import { HabitCard } from "@/app/(dashboard)/(home)/_components/habit-card/habit-card";
import { HabitForm } from "@/app/(dashboard)/(home)/_components/habit-form/habit-form";
import { Onboarding } from "@/app/(dashboard)/(home)/_components/onboarding";
import { ProgressBar } from "@/app/(dashboard)/(home)/_components/progress-bar";
import { GreetingsPanel } from "@/app/(dashboard)/greetings-panel";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useHabitsStore } from "@/hooks/habits-store";

export function HabitTracker() {
	const { items: habits } = useHabitsStore();
	const [openForm, setOpenForm] = useState(false);
	return (
		<>
			<header className="bg-card border-border sticky top-0 right-0 left-0 z-20 border-b">
				<div className="space-y-4 px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200">
								<Logo className="size-6" />
							</div>
							<div>
								<GreetingsPanel />
								<h1 className="text-foreground text-lg font-bold">Tiny Habits</h1>
							</div>
						</div>
						<Button
							onClick={() => setOpenForm(true)}
							className="rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white"
						>
							<Plus className="mr-1 h-4 w-4" />
							New Recipe
						</Button>
					</div>
					<ProgressBar habits={habits} />
				</div>
			</header>

			<main className="relative flex flex-1 flex-col overflow-auto">
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
			</main>

			<HabitForm open={openForm} setOpen={setOpenForm} />
		</>
	);
}
