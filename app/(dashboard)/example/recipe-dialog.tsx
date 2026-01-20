import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon, X } from "lucide-react";

import { steps } from "@/app/(dashboard)/example/data";

// --- Types ---

export interface HabitFormData {
	anchor: string;
	anchor_category: string;
	tiny_behavior: string;
	celebration: string;
}

export interface HabitData {
	anchor?: string;
	anchor_category?: string;
	tiny_behavior?: string;
	celebration?: string;
}

export interface StepConfig {
	id: "anchor" | "behavior" | "celebration" | "rehearsal";
	title: string;
	subtitle: string;
	icon: LucideIcon;
	color: string;
	bgColor: string;
	prefix?: string;
	placeholder?: string;
	tip: string;
}

// --- Constants ---

// --- Sub-Components ---

/**
 * 1. RecipeDialog (The Shell)
 * Handles animations, the header (progress bar), and the footer structure.
 */
export const RecipeDialog = ({
	isOpen,
	onClose,
	currentStepIndex,
	step,
	rehearsalCount,
	rehearsalTarget,
	children,
	footer,
}: {
	isOpen: boolean;
	onClose: () => void;
	currentStepIndex: number;
	step: StepConfig;
	rehearsalCount: number;
	rehearsalTarget: number;
	children: React.ReactNode;
	footer: React.ReactNode;
}) => {
	const StepIcon = step.icon;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
					onClick={onClose}
				>
					<motion.div
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: "100%", opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
					>
						{/* Header */}
						<div className={`bg-linear-to-br ${step.bgColor} relative border-b p-6`}>
							<button
								onClick={onClose}
								className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-stone-500 transition-colors hover:bg-white hover:text-stone-700"
							>
								<X className="h-4 w-4" />
							</button>

							{/* Steps Progress Bar */}
							<div className="mb-6 flex gap-2">
								{steps.map((s, idx) => (
									<div
										key={s.id}
										className={`h-1.5 flex-1 rounded-full transition-all ${
											idx <= currentStepIndex ? `bg-linear-to-r ${step.color}` : "bg-stone-200"
										}`}
									/>
								))}
							</div>

							{/* Rehearsal Specific Progress */}
							{step.id === "rehearsal" && (
								<div className="mb-4">
									<div className="mb-2 flex items-center justify-between">
										<span className="text-xs text-stone-600">Rehearsals completed</span>
										<span className="text-sm font-bold text-purple-600">
											{rehearsalCount}/{rehearsalTarget}
										</span>
									</div>
									<div className="h-2 overflow-hidden rounded-full bg-stone-200">
										<motion.div
											animate={{ width: `${(rehearsalCount / rehearsalTarget) * 100}%` }}
											className="h-full rounded-full bg-linear-to-r from-purple-500 to-violet-600"
											transition={{ duration: 0.3 }}
										/>
									</div>
								</div>
							)}

							{/* Step Title & Icon */}
							<div className="flex items-center gap-4">
								<motion.div
									key={currentStepIndex}
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className={`h-14 w-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg`}
								>
									<StepIcon className="h-7 w-7 text-white" />
								</motion.div>
								<div>
									<p className="mb-1 text-xs tracking-wide text-stone-500 uppercase">
										Step {currentStepIndex + 1} of {steps.length}
									</p>
									<h2 className="text-xl font-bold text-stone-800">{step.title}</h2>
								</div>
							</div>
						</div>

						{/* Scrollable Content */}
						<div className="flex-1 overflow-y-auto p-6">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentStepIndex}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									className="space-y-4"
								>
									{children}
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Footer Area */}
						{footer && <div className="flex gap-3 border-t bg-stone-50 p-4">{footer}</div>}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
