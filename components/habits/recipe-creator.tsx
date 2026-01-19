import React, { ChangeEvent, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
	Anchor,
	ArrowLeft,
	ArrowRight,
	Brain,
	Lightbulb,
	LucideIcon,
	PartyPopper,
	Repeat,
	Sparkles,
	X,
	Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import AnchorLibrary from "./anchor-library";

// --- Types ---

// The internal state of the form fields
interface HabitFormData {
	anchor: string;
	anchor_category: string; // You can restrict this to "morning" | "evening" etc. if you have a strict enum
	tiny_behavior: string;
	celebration: string;
}

// The structure of the editingHabit prop
interface HabitData {
	anchor?: string;
	anchor_category?: string;
	tiny_behavior?: string;
	celebration?: string;
}

// The structure for each step in the wizard
interface StepConfig {
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

// Component Props
interface RecipeCreatorProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (habit: HabitFormData) => void;
	editingHabit?: HabitData | null;
}

// --- Constants ---

const steps: StepConfig[] = [
	{
		id: "anchor",
		title: "Choose Your Anchor",
		subtitle: "What existing routine will trigger your new behavior?",
		icon: Anchor,
		color: "from-blue-500 to-indigo-500",
		bgColor: "from-blue-50 to-indigo-50",
		prefix: "After I",
		placeholder: "pour my morning coffee...",
		tip: "Pick something you already do reliably every day. The more consistent, the better!",
	},
	{
		id: "behavior",
		title: "Design Your Tiny Behavior",
		subtitle: "What super small action will you take? (under 30 seconds!)",
		icon: Zap,
		color: "from-emerald-500 to-green-600",
		bgColor: "from-emerald-50 to-green-100",
		prefix: "I will",
		placeholder: "take one deep breath...",
		tip: "Make it tiny! If you can't do it in 30 seconds or less, shrink it down.",
	},
	{
		id: "celebration",
		title: "Pick Your Celebration",
		subtitle: "How will you create a positive feeling right after?",
		icon: PartyPopper,
		color: "from-amber-500 to-orange-500",
		bgColor: "from-amber-50 to-orange-50",
		prefix: "Then I will",
		placeholder: 'say "Awesome!" and smile...',
		tip: "This is the secret sauce! A genuine positive emotion wires the habit into your brain.",
	},
	{
		id: "rehearsal",
		title: "Rehearsal Time!",
		subtitle: "Wire your habit into your brain by rehearsing it now",
		icon: Brain,
		color: "from-purple-500 to-violet-600",
		bgColor: "from-purple-50 to-violet-100",
		tip: "Rehearsing creates neural pathways. The more you practice the sequence, the more automatic it becomes!",
	},
];

const celebrationSuggestions: string[] = [
	"Say 'Victory!' out loud",
	"Do a little fist pump",
	"Smile and say 'I did it!'",
	"Give myself a thumbs up",
	"Do a tiny happy dance",
	"Take a satisfied breath",
	"Say 'Good job, me!'",
	"Snap my fingers proudly",
];

// --- Component ---

export default function RecipeCreator({
	isOpen,
	onClose,
	onSave,
	editingHabit,
}: RecipeCreatorProps) {
	const [currentStep, setCurrentStep] = useState<number>(0);

	const [formData, setFormData] = useState<HabitFormData>({
		anchor: editingHabit?.anchor?.replace("After I ", "") || "",
		anchor_category: editingHabit?.anchor_category || "other",
		tiny_behavior: editingHabit?.tiny_behavior?.replace("I will ", "") || "",
		celebration: editingHabit?.celebration?.replace("Then I will ", "") || "",
	});

	const [showAnchorLibrary, setShowAnchorLibrary] = useState<boolean>(false);
	const [rehearsalCount, setRehearsalCount] = useState<number>(0);
	const rehearsalTarget = 5;

	const step = steps[currentStep];
	const StepIcon = step.icon;

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSave = () => {
		onSave({
			anchor: "After I " + formData.anchor,
			anchor_category: formData.anchor_category,
			tiny_behavior: "I will " + formData.tiny_behavior,
			celebration: "Then I will " + formData.celebration,
		});
		// Reset for next time
		setRehearsalCount(0);
		setCurrentStep(0);
		setFormData({
			anchor: "",
			anchor_category: "other",
			tiny_behavior: "",
			celebration: "",
		});
		onClose();
	};

	const handleRehearsal = () => {
		if (rehearsalCount < rehearsalTarget - 1) {
			setRehearsalCount(rehearsalCount + 1);
		} else {
			handleSave();
		}
	};

	const getCurrentValue = (): string => {
		if (step.id === "anchor") return formData.anchor;
		if (step.id === "behavior") return formData.tiny_behavior;
		return formData.celebration;
	};

	const setCurrentValue = (value: string) => {
		if (step.id === "anchor") setFormData({ ...formData, anchor: value });
		else if (step.id === "behavior") setFormData({ ...formData, tiny_behavior: value });
		else if (step.id === "celebration") setFormData({ ...formData, celebration: value });
	};

	const isStepValid = (): boolean => {
		return getCurrentValue().trim().length > 0;
	};

	const handleSelectAnchor = (anchor: string, category: string) => {
		setFormData({
			...formData,
			anchor: anchor.replace("After I ", "").replace("After ", ""),
			anchor_category: category,
		});
		setShowAnchorLibrary(false);
	};

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

							{/* Progress */}
							<div className="mb-6 flex gap-2">
								{steps.map((s, idx) => (
									<div
										key={s.id}
										className={`h-1.5 flex-1 rounded-full transition-all ${
											idx <= currentStep ? `bg-linear-to-r ${step.color}` : "bg-stone-200"
										}`}
									/>
								))}
							</div>

							{/* Rehearsal Progress */}
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

							<div className="flex items-center gap-4">
								<motion.div
									key={currentStep}
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className={`h-14 w-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg`}
								>
									<StepIcon className="h-7 w-7 text-white" />
								</motion.div>
								<div>
									<p className="mb-1 text-xs tracking-wide text-stone-500 uppercase">
										Step {currentStep + 1} of {steps.length}
									</p>
									<h2 className="text-xl font-bold text-stone-800">{step.title}</h2>
								</div>
							</div>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto p-6">
							<AnimatePresence mode="wait">
								<motion.div
									key={currentStep}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									className="space-y-4"
								>
									{step.id === "rehearsal" ? (
										/* Rehearsal Step */
										<>
											<p className="text-stone-600">{step.subtitle}</p>

											{/* Brain Connection Visualization */}
											<div className="relative py-8">
												<motion.div
													animate={{
														scale: [1, 1.05, 1],
														opacity: [0.5, 1, 0.5],
													}}
													transition={{
														duration: 2,
														repeat: Infinity,
														ease: "easeInOut",
													}}
													className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-violet-100"
												>
													<Brain className="h-16 w-16 text-purple-600" />

													{/* Neural connections */}
													{[...Array(Math.min(rehearsalCount + 1, 5))].map((_, i) => (
														<motion.div
															key={i}
															initial={{ scale: 0, opacity: 0 }}
															animate={{ scale: 1, opacity: 1 }}
															transition={{ delay: i * 0.1 }}
															className="absolute h-2 w-2 rounded-full bg-purple-400"
															style={{
																top: `${20 + Math.sin(i * 1.3) * 40}%`,
																left: `${20 + Math.cos(i * 1.3) * 40}%`,
															}}
														/>
													))}
												</motion.div>
											</div>

											{/* Instructions */}
											<div className="space-y-3 rounded-xl border border-purple-200 bg-purple-50 p-4">
												<p className="font-semibold text-purple-900">Rehearse the full sequence:</p>
												<ol className="space-y-2 text-sm text-purple-800">
													<li className="flex items-start gap-2">
														<span className="font-bold">1.</span>
														<span>
															<strong>Anchor:</strong> {formData.anchor}
														</span>
													</li>
													<li className="flex items-start gap-2">
														<span className="font-bold">2.</span>
														<span>
															<strong>Behavior:</strong> {formData.tiny_behavior}
														</span>
													</li>
													<li className="flex items-start gap-2">
														<span className="font-bold">3.</span>
														<span>
															<strong>Celebrate:</strong> {formData.celebration}
														</span>
													</li>
												</ol>
											</div>

											{/* Why Rehearsal Works */}
											<div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3">
												<Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
												<p className="text-sm text-stone-600">{step.tip}</p>
											</div>

											{/* Rehearsal Button */}
											<motion.div whileTap={{ scale: 0.95 }} className="pt-2">
												<Button
													onClick={handleRehearsal}
													className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-violet-600 py-8 text-lg text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
												>
													<Repeat className="mr-2 h-6 w-6" />
													{rehearsalCount === rehearsalTarget - 1
														? "Complete Final Rehearsal!"
														: `I Rehearsed It! (${rehearsalCount + 1}/${rehearsalTarget})`}
												</Button>
											</motion.div>
										</>
									) : (
										/* Regular ABC Steps */
										<>
											<p className="text-stone-600">{step.subtitle}</p>

											{/* Anchor Library Toggle */}
											{step.id === "anchor" && (
												<Button
													variant="outline"
													onClick={() => setShowAnchorLibrary(!showAnchorLibrary)}
													className="w-full rounded-xl border-2 border-dashed py-3"
												>
													<Sparkles className="mr-2 h-4 w-4 text-amber-500" />
													{showAnchorLibrary ? "Write my own" : "Browse anchor ideas"}
												</Button>
											)}

											{step.id === "anchor" && showAnchorLibrary ? (
												<AnchorLibrary
													onSelectAnchor={handleSelectAnchor}
													selectedAnchor={"After I " + formData.anchor}
												/>
											) : (
												<>
													{/* Input Field */}
													<div className="relative">
														<div
															className={`absolute top-4 left-4 bg-linear-to-r text-sm font-semibold ${step.color} bg-clip-text text-transparent`}
														>
															{step.prefix}
														</div>
														<Textarea
															value={getCurrentValue()}
															onChange={(e) => setCurrentValue(e.target.value)}
															placeholder={step.placeholder}
															className="min-h-[120px] rounded-2xl border-stone-200 pt-10 text-lg focus:border-emerald-400 focus:ring-emerald-400"
														/>
													</div>

													{/* Celebration Suggestions */}
													{step.id === "celebration" && (
														<div className="space-y-2">
															<p className="flex items-center gap-2 text-sm text-stone-500">
																<Sparkles className="h-4 w-4 text-amber-500" />
																Quick picks:
															</p>
															<div className="flex flex-wrap gap-2">
																{celebrationSuggestions.map((suggestion, idx) => (
																	<button
																		key={idx}
																		onClick={() => setCurrentValue(suggestion.toLowerCase())}
																		className={`rounded-full px-3 py-1.5 text-sm transition-all ${
																			getCurrentValue() === suggestion.toLowerCase()
																				? "bg-amber-500 text-white"
																				: "bg-amber-50 text-amber-700 hover:bg-amber-100"
																		}`}
																	>
																		{suggestion}
																	</button>
																))}
															</div>
														</div>
													)}
												</>
											)}

											{/* Tip */}
											<div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3">
												<Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
												<p className="text-sm text-stone-600">{step.tip}</p>
											</div>
										</>
									)}
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Footer */}
						{step.id !== "rehearsal" && (
							<div className="flex gap-3 border-t bg-stone-50 p-4">
								{currentStep > 0 && (
									<Button variant="outline" onClick={handleBack} className="flex-1 rounded-xl py-6">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
								)}
								<Button
									onClick={handleNext}
									disabled={!isStepValid()}
									className={`flex-1 rounded-xl bg-linear-to-r py-6 ${step.color} text-white hover:opacity-90`}
								>
									{currentStep === steps.length - 2 ? (
										<>
											Next: Rehearsal
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									) : (
										<>
											Next
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</Button>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
