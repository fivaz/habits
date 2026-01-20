import React from "react";

import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

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

type CelebrationSuggestionsProps = {
	value: string;
	setValue: (value: string) => void;
};

export function CelebrationSuggestions({ value, setValue }: CelebrationSuggestionsProps) {
	return (
		<div className="space-y-2">
			<p className="flex items-center gap-2 text-sm text-stone-500">
				<Sparkles className="h-4 w-4 text-amber-500" />
				Quick picks:
			</p>
			<div className="flex flex-wrap gap-2">
				{celebrationSuggestions.map((suggestion, index) => (
					<button
						key={index}
						onClick={() => setValue(suggestion.toLowerCase())}
						className={cn(
							"rounded-full px-3 py-1.5 text-sm transition-all",
							value === suggestion.toLowerCase()
								? "bg-amber-500 text-white"
								: "bg-amber-50 text-amber-700 hover:bg-amber-100",
						)}
					>
						{suggestion}
					</button>
				))}
			</div>
		</div>
	);
}
