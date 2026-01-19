// @ts-nocheck
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	Bell,
	HelpCircle,
	Lightbulb,
	Minimize2,
	RefreshCw,
	Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const reasons = [
	{
		id: "too_hard",
		icon: Minimize2,
		title: "It was too hard",
		subtitle: "The behavior needs to be tinier",
		color: "from-rose-50 to-pink-50 border-rose-200",
		iconBg: "bg-rose-100",
		iconColor: "text-rose-600",
		suggestions: [
			"Can you do just the first step?",
			"Can you do it for just 2 seconds?",
			"What's the tiniest version possible?",
		],
	},
	{
		id: "forgot",
		icon: Bell,
		title: "I forgot",
		subtitle: "The anchor needs improvement",
		color: "from-amber-50 to-orange-50 border-amber-200",
		iconBg: "bg-amber-100",
		iconColor: "text-amber-600",
		suggestions: [
			"Is your anchor happening reliably?",
			"Can you attach a visual reminder?",
			"Would a different anchor work better?",
		],
	},
	{
		id: "anchor_missing",
		icon: HelpCircle,
		title: "My anchor didn't happen",
		subtitle: "The routine itself was disrupted",
		color: "from-blue-50 to-indigo-50 border-blue-200",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		suggestions: [
			"What anchor happens every day without fail?",
			"Can you chain to a more reliable routine?",
			"Consider morning anchors - they're most consistent",
		],
	},
];

export default function RedesignFlow({ isOpen, onClose, habit, onRedesign }) {
	const [step, setStep] = useState(1);
	const [selectedReason, setSelectedReason] = useState(null);
	const [newTinyBehavior, setNewTinyBehavior] = useState(habit?.tiny_behavior || "");
	const [newAnchor, setNewAnchor] = useState(habit?.anchor || "");

	const handleSubmit = () => {
		onRedesign({
			...habit,
			anchor: newAnchor,
			tiny_behavior: newTinyBehavior,
			redesign_reason: selectedReason,
		});
		onClose();
	};

	const resetFlow = () => {
		setStep(1);
		setSelectedReason(null);
		setNewTinyBehavior(habit?.tiny_behavior || "");
		setNewAnchor(habit?.anchor || "");
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.9, opacity: 0, y: 20 }}
						onClick={(e) => e.stopPropagation()}
						className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
					>
						{/* Header */}
						<div className="border-b border-stone-200 bg-linear-to-br from-stone-50 to-stone-100 p-6">
							<div className="mb-2 flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
									<Lightbulb className="h-5 w-5 text-stone-600" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-stone-800">Let's Redesign</h2>
									<p className="text-sm text-stone-500">Every miss is a chance to learn</p>
								</div>
							</div>
						</div>

						<div className="p-6">
							<AnimatePresence mode="wait">
								{step === 1 && (
									<motion.div
										key="step1"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className="space-y-4"
									>
										<p className="text-sm font-medium text-stone-600">What happened?</p>

										<div className="space-y-3">
											{reasons.map((reason) => {
												const Icon = reason.icon;
												return (
													<button
														key={reason.id}
														onClick={() => {
															setSelectedReason(reason.id);
															setStep(2);
														}}
														className={`w-full rounded-2xl border bg-linear-to-br p-4 ${reason.color} text-left transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]`}
													>
														<div className="flex items-center gap-3">
															<div
																className={`h-10 w-10 rounded-xl ${reason.iconBg} flex items-center justify-center`}
															>
																<Icon className={`h-5 w-5 ${reason.iconColor}`} />
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
									</motion.div>
								)}

								{step === 2 && (
									<motion.div
										key="step2"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										className="space-y-5"
									>
										{/* Suggestions */}
										<div className="space-y-2">
											<p className="flex items-center gap-2 text-sm font-medium text-stone-600">
												<Sparkles className="h-4 w-4 text-amber-500" />
												Ask yourself:
											</p>
											<div className="space-y-2">
												{reasons
													.find((r) => r.id === selectedReason)
													?.suggestions.map((suggestion, idx) => (
														<motion.div
															key={idx}
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ delay: idx * 0.1 }}
															className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700"
														>
															{suggestion}
														</motion.div>
													))}
											</div>
										</div>

										{/* Edit Fields */}
										{(selectedReason === "forgot" || selectedReason === "anchor_missing") && (
											<div className="space-y-2">
												<label className="text-sm font-medium text-stone-700">New Anchor</label>
												<div className="relative">
													<span className="absolute top-3 left-3 text-sm font-medium text-emerald-600">
														After I
													</span>
													<Textarea
														value={newAnchor.replace("After I ", "")}
														onChange={(e) => setNewAnchor("After I " + e.target.value)}
														className="min-h-[80px] rounded-xl border-stone-200 pl-16 focus:border-emerald-400 focus:ring-emerald-400"
														placeholder="existing routine..."
													/>
												</div>
											</div>
										)}

										{selectedReason === "too_hard" && (
											<div className="space-y-2">
												<label className="text-sm font-medium text-stone-700">
													New Tiny Behavior
												</label>
												<div className="relative">
													<span className="absolute top-3 left-3 text-sm font-medium text-emerald-600">
														I will
													</span>
													<Textarea
														value={newTinyBehavior.replace("I will ", "")}
														onChange={(e) => setNewTinyBehavior("I will " + e.target.value)}
														className="min-h-[80px] rounded-xl border-stone-200 pl-14 focus:border-emerald-400 focus:ring-emerald-400"
														placeholder="something even tinier..."
													/>
												</div>
												<p className="flex items-center gap-1 text-xs text-stone-500">
													<Minimize2 className="h-3 w-3" />
													Think: What's the 2-second version?
												</p>
											</div>
										)}

										{/* Action Buttons */}
										<div className="flex gap-3 pt-2">
											<Button variant="outline" onClick={resetFlow} className="flex-1 rounded-xl">
												Back
											</Button>
											<Button
												onClick={handleSubmit}
												className="flex-1 rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700"
											>
												<RefreshCw className="mr-2 h-4 w-4" />
												Redesign Habit
											</Button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Footer Note */}
						<div className="px-6 pb-6">
							<div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
								<Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
								<p className="text-xs text-amber-800">
									<strong>Remember:</strong> Behaviors that feel hard usually need to be made
									smaller, not pushed through with willpower.
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
