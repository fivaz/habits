import React, { useState } from "react";

import { Sparkles } from "lucide-react";

import { AnchorLibrary } from "@/app/(dashboard)/(home)/_components/habit-form/anchor-step/anchor-library";
import { Button } from "@/components/ui/button";

type AnchorSuggestionsProps = {
	value: string;
	setAnchorValue: (value: string) => void;
};

export function AnchorSuggestions({ value, setAnchorValue }: AnchorSuggestionsProps) {
	const [showAnchorLibrary, setShowAnchorLibrary] = useState<boolean>(false);

	const handleSelectSuggestion = (suggestion: string) => {
		setAnchorValue(suggestion);
		setShowAnchorLibrary(false);
	};

	return (
		<>
			<Button
				variant="ghost"
				onClick={() => setShowAnchorLibrary(!showAnchorLibrary)}
				className="w-full rounded-xl border-2 border-dashed border-gray-300 py-3 dark:border-gray-500"
			>
				<Sparkles className="mr-2 h-4 w-4 text-amber-500" />
				{showAnchorLibrary ? "Write my own" : "Browse anchor ideas"}
			</Button>
			{showAnchorLibrary && <AnchorLibrary setValue={handleSelectSuggestion} value={value} />}
		</>
	);
}
