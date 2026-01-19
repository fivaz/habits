import React, { useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format, isToday, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, Coffee, Leaf, Moon, Plus, Sparkles, Sun } from "lucide-react";

import CelebrationOverlay from "@/components/habits/celebration-overlay";
import HabitCard from "@/components/habits/habit-card";
import RecipeCreator from "@/components/habits/recipe-creator";
import RedesignFlow from "@/components/habits/redesign-flow";
import { Button } from "@/components/ui/button";

const HabitRecipe = base44.entities.HabitRecipe;
const DailyLog = base44.entities.DailyLog;

export default function Home() {
	const queryClient = useQueryClient();
	const [showCreator, setShowCreator] = useState(false);
	const [editingHabit, setEditingHabit] = useState(null);
	const [celebratingHabit, setCelebratingHabit] = useState(null);
	const [redesigningHabit, setRedesigningHabit] = useState(null);

	const today = format(new Date(), "yyyy-MM-dd");

	// Fetch habits
	const { data: habits = [], isLoading: habitsLoading } = useQuery({
		queryKey: ["habits"],
		queryFn: () => HabitRecipe.filter({ is_active: true }),
	});

	// Fetch today's logs
	const { data: todayLogs = [] } = useQuery({
		queryKey: ["logs", today],
		queryFn: () => DailyLog.filter({ date: today }),
	});

	// Create habit mutation
	const createHabitMutation = useMutation({
		mutationFn: (data) => HabitRecipe.create(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
	});

	// Update habit mutation
	const updateHabitMutation = useMutation({
		mutationFn: ({ id, data }) => HabitRecipe.update(id, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
	});

	// Delete habit mutation
	const deleteHabitMutation = useMutation({
		mutationFn: (id) => HabitRecipe.delete(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
	});

	// Create log mutation
	const createLogMutation = useMutation({
		mutationFn: (data) => DailyLog.create(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logs", today] }),
	});

	const completedHabitIds = useMemo(() => {
		return new Set(
			todayLogs.filter((log) => log.status === "completed").map((log) => log.habit_id),
		);
	}, [todayLogs]);

	const handleSaveHabit = async (data) => {
		if (editingHabit) {
			await updateHabitMutation.mutateAsync({ id: editingHabit.id, data });
			setEditingHabit(null);
		} else {
			await createHabitMutation.mutateAsync({
				...data,
				is_active: true,
				streak: 0,
				total_completions: 0,
			});
		}
		setShowCreator(false);
	};

	const handleComplete = async (habit) => {
		// Create completion log
		await createLogMutation.mutateAsync({
			habit_id: habit.id,
			date: today,
			status: "completed",
			celebration_done: true,
		});

		// Update habit stats
		const newStreak =
			habit.last_completed_date && isToday(parseISO(habit.last_completed_date))
				? habit.streak
				: (habit.streak || 0) + 1;

		await updateHabitMutation.mutateAsync({
			id: habit.id,
			data: {
				streak: newStreak,
				total_completions: (habit.total_completions || 0) + 1,
				last_completed_date: today,
			},
		});

		// Show celebration
		setCelebratingHabit(habit);
	};

	const handleRedesign = async (updatedHabit) => {
		await updateHabitMutation.mutateAsync({
			id: updatedHabit.id,
			data: {
				anchor: updatedHabit.anchor,
				tiny_behavior: updatedHabit.tiny_behavior,
				times_redesigned: (updatedHabit.times_redesigned || 0) + 1,
			},
		});

		// Log the redesign
		await createLogMutation.mutateAsync({
			habit_id: updatedHabit.id,
			date: today,
			status: "redesigned",
			redesign_reason: updatedHabit.redesign_reason,
		});

		setRedesigningHabit(null);
	};

	const handleEdit = (habit) => {
		setEditingHabit(habit);
		setShowCreator(true);
	};

	const handleDelete = async (habit) => {
		await deleteHabitMutation.mutateAsync(habit.id);
	};

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return { text: "Good morning", icon: Sun };
		if (hour < 17) return { text: "Good afternoon", icon: Coffee };
		return { text: "Good evening", icon: Moon };
	};

	const greeting = getGreeting();
	const GreetingIcon = greeting.icon;

	const completedCount = habits.filter((h) => completedHabitIds.has(h.id)).length;
	const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50">
			{/* Header */}
			<div className="sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur-md">
				<div className="mx-auto max-w-lg px-4 py-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200">
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
						<Button
							onClick={() => {
								setEditingHabit(null);
								setShowCreator(true);
							}}
							className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-green-700"
						>
							<Plus className="mr-1 h-4 w-4" />
							New Recipe
						</Button>
					</div>

					{/* Progress Bar */}
					{habits.length > 0 && (
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-stone-500">Today's Progress</span>
								<span className="font-semibold text-stone-700">
									{completedCount}/{habits.length}
								</span>
							</div>
							<div className="h-2 overflow-hidden rounded-full bg-stone-100">
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: `${progress}%` }}
									transition={{ duration: 0.5, ease: "easeOut" }}
									className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
								/>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="mx-auto max-w-lg px-4 py-6">
				{habitsLoading ? (
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-48 animate-pulse rounded-2xl bg-stone-100" />
						))}
					</div>
				) : habits.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="py-16 text-center"
					>
						<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-green-100">
							<Sparkles className="h-10 w-10 text-emerald-500" />
						</div>
						<h2 className="mb-2 text-2xl font-bold text-stone-800">Start Your First Tiny Habit</h2>
						<p className="mx-auto mb-6 max-w-xs text-stone-500">
							Tiny habits are the foundation of big change. Let's create your first ABC recipe!
						</p>
						<Button
							onClick={() => setShowCreator(true)}
							size="lg"
							className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-green-700"
						>
							<Plus className="mr-2 h-5 w-5" />
							Create Your First Recipe
						</Button>

						{/* Learn More Section */}
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
				) : (
					<div className="space-y-4">
						<AnimatePresence>
							{habits.map((habit) => (
								<HabitCard
									key={habit.id}
									habit={habit}
									isCompletedToday={completedHabitIds.has(habit.id)}
									onComplete={() => handleComplete(habit)}
									onRedesign={() => setRedesigningHabit(habit)}
									onEdit={() => handleEdit(habit)}
									onDelete={() => handleDelete(habit)}
								/>
							))}
						</AnimatePresence>
					</div>
				)}
			</div>

			{/* Recipe Creator Modal */}
			<RecipeCreator
				isOpen={showCreator}
				onClose={() => {
					setShowCreator(false);
					setEditingHabit(null);
				}}
				onSave={handleSaveHabit}
				editingHabit={editingHabit}
			/>

			{/* Celebration Overlay */}
			<CelebrationOverlay
				isOpen={!!celebratingHabit}
				onClose={() => setCelebratingHabit(null)}
				celebration={celebratingHabit?.celebration}
				habitName={celebratingHabit?.tiny_behavior}
			/>

			{/* Redesign Flow */}
			<RedesignFlow
				isOpen={!!redesigningHabit}
				onClose={() => setRedesigningHabit(null)}
				habit={redesigningHabit}
				onRedesign={handleRedesign}
			/>
		</div>
	);
}
