import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Lightbulb } from "lucide-react";
import { toast } from "sonner";

import { AnchorMissingView } from "@/app/(dashboard)/(home)/_components/redesign-form/anchor-missing-view";
import { ForgotView } from "@/app/(dashboard)/(home)/_components/redesign-form/forgot-view";
import { ReasonId, reasons } from "@/app/(dashboard)/(home)/_components/redesign-form/service";
import { TooHardView } from "@/app/(dashboard)/(home)/_components/redesign-form/too-hard-view";
import { useHabitMutations } from "@/hooks/habits-store";
import { upsertHabitAction } from "@/lib/habits/actions";
import { TodayHabitUI } from "@/lib/habits/type";
import { cn } from "@/lib/utils";

type View = "menu" | ReasonId;

type RedesignFormProps = {
	habit: TodayHabitUI;
	onClose: () => void;
};

export function RedesignForm({ habit, onClose }: RedesignFormProps) {
	const [view, setView] = useState<View>("menu");
	const { updateItem } = useHabitMutations();

	const onResetFlow = () => setView("menu");

	function updateHabit(habit: TodayHabitUI) {
		const optimisticHabit = { ...habit, rehearsalCount: 0 };

		updateItem(optimisticHabit, {
			persist: () => upsertHabitAction(optimisticHabit),
			onError: () => toast.error("Failed to update habit. Please try again."),
			onSuccess: () => toast.success("Habit updated successfully."),
		});

		onClose();
	}

	const renderView = (currentView: View) => {
		switch (currentView) {
			case "too_hard":
				return <TooHardView updateHabit={updateHabit} onResetFlow={onResetFlow} habit={habit} />;
			case "forgot":
				return <ForgotView onResetFlow={onResetFlow} updateHabit={updateHabit} habit={habit} />;
			case "anchor_missing":
				return (
					<AnchorMissingView onResetFlow={onResetFlow} updateHabit={updateHabit} habit={habit} />
				);
			case "menu":
			default:
				return <MenuView setView={setView} />;
		}
	};

	return (
		<div className="bg-card">
			<div className="border-border bg-muted border-b p-6">
				<div className="mb-2 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
						<Lightbulb className="h-5 w-5 text-emerald-600" />
					</div>
					<div>
						<h2 className="text-foreground text-lg font-bold">Let's Redesign</h2>
						<p className="text-muted-foreground text-sm">Every miss is a chance to learn</p>
					</div>
				</div>
			</div>

			<div className="p-6">
				<AnimatePresence mode="wait">
					<motion.div
						key={view}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-4"
					>
						{renderView(view)}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="px-6 pb-6">
				<div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:bg-amber-100">
					<Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
					<p className="text-xs text-amber-800">
						<strong>Remember:</strong> Behaviors that feel hard usually need to be made smaller, not
						pushed through with willpower.
					</p>
				</div>
			</div>
		</div>
	);
}

type MenuViewProps = {
	setView: (view: View) => void;
};

function MenuView({ setView }: MenuViewProps) {
	return (
		<>
			<p className="text-foreground text-sm font-medium">What happened?</p>

			<div className="space-y-3">
				{reasons.map((reason) => {
					const Icon = reason.icon;
					return (
						<button
							onClick={() => setView(reason.id)}
							key={reason.id}
							type="button"
							className={cn(
								"w-full rounded-2xl border bg-linear-to-br p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
								reason.color,
							)}
						>
							<div className="flex items-center gap-3">
								<div
									className={cn(
										reason.iconBg,
										"flex h-10 w-10 items-center justify-center rounded-xl",
									)}
								>
									<Icon className={cn(reason.iconColor, "h-5 w-5")} />
								</div>
								<div className="flex-1">
									<p className="font-medium text-stone-800">{reason.title}</p>
									<p className="text-xs text-stone-500">{reason.subtitle}</p>
								</div>
								<ArrowRight className="h-4 w-4 text-stone-400" />
							</div>
						</button>
					);
				})}
			</div>
		</>
	);
}
