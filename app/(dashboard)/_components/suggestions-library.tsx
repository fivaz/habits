import React, { useState } from "react";

import { Sparkles } from "lucide-react";

import { steps } from "@/app/(dashboard)/_components/service";
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

type AnchorLibraryProps = {
	value: string;
	currentStepIndex: number;
	setValue: (value: string) => void;
};

export function SuggestionsLibrary({ currentStepIndex, value, setValue }: AnchorLibraryProps) {
	const [showAnchorLibrary, setShowAnchorLibrary] = useState<boolean>(false);
	const step = steps[currentStepIndex];

	return (
		<>
			<Button
				variant="outline"
				onClick={() => setShowAnchorLibrary(!showAnchorLibrary)}
				className="w-full rounded-xl border-2 border-dashed py-3"
			>
				<Sparkles className="mr-2 h-4 w-4 text-amber-500" />
				{showAnchorLibrary ? "Write my own" : "Browse anchor ideas"}
			</Button>

			{currentStepIndex === 0 && showAnchorLibrary ? (
				<div>Suggestion Library</div>
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
							onChange={(e) => setValue(e.target.value)}
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
										onClick={() => setValue(suggestion.toLowerCase())}
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
		</>
	);
}
