import React, { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Repeat } from "lucide-react";
import { Activity, Circle, Cpu, Share2, Spline, Zap } from "lucide-react";
import { toast } from "sonner";

import { RehearsalPanel } from "@/app/(dashboard)/(home)/_components/habit-form/rehearsal-step/rehearsal-panel";
import { StepTip } from "@/app/(dashboard)/(home)/_components/habit-form/step-body";
import { Step, steps } from "@/app/(dashboard)/(home)/_components/service";
import { Button } from "@/components/ui/button";
import { rehearsalHabitAction } from "@/lib/habits/actions";
import { REHEARSAL_TARGET, TodayHabitUI } from "@/lib/habits/type";
import { logError } from "@/lib/logger";
import { cn } from "@/lib/utils";

const HABIT_LEVELS = {
	0: { label: "Dormant", icon: Circle, color: "text-slate-400" },
	1: { label: "Sparking", icon: Zap, color: "text-yellow-500" },
	2: { label: "Tracing", icon: Spline, color: "text-violet-400" },
	3: { label: "Grooving", icon: Activity, color: "text-violet-600" },
	4: { label: "Strengthening", icon: Share2, color: "text-purple-600" },
	5: { label: "Hardwired", icon: Cpu, color: "text-fuchsia-600" },
};

export const renderHabitButtonContent = (count: number) => {
	// Fallback to max level if count exceeds 5
	const level = HABIT_LEVELS[Math.min(count, 5) as keyof typeof HABIT_LEVELS];
	const Icon = level.icon;

	return (
		<div className="flex items-center gap-2">
			<AnimatePresence mode="wait">
				<motion.div
					key={count} // Key changes trigger re-animation
					initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
					animate={{ scale: 1, opacity: 1, rotate: 0 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 15 }}
				>
					<Icon size={18} strokeWidth={2.5} />
				</motion.div>
			</AnimatePresence>

			<span className={cn("font-medium transition-colors duration-300")}>{level.label}</span>
		</div>
	);
};

type RehearsalStepFormProps = {
	habitIn: TodayHabitUI;
	onClose: () => void;
	setHabitIn: Dispatch<SetStateAction<TodayHabitUI>>;
};

export function RehearsalStepForm({ setHabitIn, onClose, habitIn }: RehearsalStepFormProps) {
	const step = steps[Step.REHEARSAL];

	const incrementRehearsal = (habit: TodayHabitUI) => ({
		...habit,
		rehearsalCount: habit.rehearsalCount + 1,
	});

	const onRehearse = async () => {
		setHabitIn((prev) => {
			const optimisticHabit = incrementRehearsal(prev);

			if (optimisticHabit.rehearsalCount === REHEARSAL_TARGET) {
				setTimeout(() => onClose(), 2000);
			}

			return optimisticHabit;
		});

		try {
			await rehearsalHabitAction(habitIn.id);
		} catch (error) {
			logError(error, "RehearsalStepForm/onRehearse", { extra: { habitIn } });
			toast.error("Could not log rehearsal. Please try again.");
		}
	};

	return (
		<div className="flex-1 overflow-y-auto p-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={Step.REHEARSAL}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					className="space-y-4"
				>
					<div className="text-foreground">{step.subtitle}</div>

					<RehearsalPanel habit={habitIn} />

					<StepTip step={step} />

					<motion.div whileTap={{ scale: 0.95 }} className="pt-2">
						<Button
							disabled={habitIn.rehearsalCount === REHEARSAL_TARGET}
							onClick={onRehearse}
							className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-violet-600 py-8 text-lg text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
						>
							<Repeat className="mr-2 h-6 w-6" />
							{renderHabitButtonContent(habitIn.rehearsalCount)}
						</Button>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
