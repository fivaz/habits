import React from "react";

import { Lightbulb, Sparkles } from "lucide-react";

import { StepConfig } from "@/app/(dashboard)/example/recipe-dialog";
import AnchorLibrary1 from "@/components/habits/anchor-library1";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

/**
 * 3. StandardStepView
 * Handles the reusable form inputs (Textarea, Anchor toggle, Chips).
 */
export const StandardStepView = ({
	step,
	value,
	onChange,
	showAnchorLibrary,
	toggleAnchorLibrary,
	onSelectAnchor,
}: {
	step: StepConfig;
	value: string;
	onChange: (val: string) => void;
	showAnchorLibrary: boolean;
	toggleAnchorLibrary: () => void;
	onSelectAnchor: (anchor: string, category: string) => void;
}) => {
	return (
		<>
			<p className="text-stone-600">{step.subtitle}</p>

			{/* Anchor Library Toggle */}
			{step.id === "anchor" && (
				<Button
					variant="outline"
					onClick={toggleAnchorLibrary}
					className="w-full rounded-xl border-2 border-dashed py-3"
				>
					<Sparkles className="mr-2 h-4 w-4 text-amber-500" />
					{showAnchorLibrary ? "Write my own" : "Browse anchor ideas"}
				</Button>
			)}

			{/* Conditional Rendering: Anchor Library OR Input Field */}
			{step.id === "anchor" && showAnchorLibrary ? (
				<AnchorLibrary1 onSelectAnchor={onSelectAnchor} selectedAnchor={"After I " + value} />
			) : (
				<>
					<div className="relative">
						<div
							className={`absolute top-4 left-4 bg-linear-to-r text-sm font-semibold ${step.color} bg-clip-text text-transparent`}
						>
							{step.prefix}
						</div>
						<Textarea
							value={value}
							onChange={(e) => onChange(e.target.value)}
							placeholder={step.placeholder}
							className="min-h-30 rounded-2xl border-stone-200 pt-10 text-lg focus:border-emerald-400 focus:ring-emerald-400"
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
										onClick={() => onChange(suggestion.toLowerCase())}
										className={`rounded-full px-3 py-1.5 text-sm transition-all ${
											value === suggestion.toLowerCase()
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

			<div className="flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3">
				<Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
				<p className="text-sm text-stone-600">{step.tip}</p>
			</div>
		</>
	);
};
