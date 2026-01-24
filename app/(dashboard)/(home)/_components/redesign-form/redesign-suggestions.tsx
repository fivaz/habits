import React from "react";

import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";

import { ReasonId, reasons } from "@/app/(dashboard)/(home)/_components/redesign-form/service";
import { Button } from "@/components/ui/button";

type RedesignSuggestionsProps = {
	reasonId: ReasonId;
};

export function RedesignSuggestions({ reasonId }: RedesignSuggestionsProps) {
	return (
		<>
			<div className="space-y-2">
				<p className="text-foreground flex items-center gap-2 text-sm font-medium">
					<Sparkles className="h-4 w-4 text-amber-500" />
					Ask yourself:
				</p>
				<div className="space-y-2">
					{reasons
						.find((r) => r.id === reasonId)
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
		</>
	);
}

type RedesignActionButtonsProps = {
	onResetFlow: () => void;
	onSubmit: () => void;
};

export function RedesignActionButtons({ onResetFlow, onSubmit }: RedesignActionButtonsProps) {
	return (
		<div className="flex gap-3 pt-2">
			<Button onClick={onResetFlow} variant="outline" className="flex-1 rounded-xl">
				Back
			</Button>
			<Button
				onClick={onSubmit}
				className="flex-1 rounded-xl bg-linear-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700"
			>
				<RefreshCw className="mr-2 h-4 w-4" />
				Redesign Habit
			</Button>
		</div>
	);
}
