import React from "react";

import { Lightbulb } from "lucide-react";

import { StepConfig } from "@/app/(dashboard)/(home)/_components/service";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type StepTipProps = {
	step: StepConfig;
};

export function StepTip({ step }: StepTipProps) {
	return (
		<div className="bg-muted border-border flex items-start gap-2 rounded-xl border p-3">
			<Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
			<p className="text-muted-foreground text-sm">{step.tip}</p>
		</div>
	);
}

type StepTextAreaProps = {
	step: StepConfig;
	value: string;
	setValue: (value: string) => void;
};

export function StepTextArea({ step, value, setValue }: StepTextAreaProps) {
	return (
		<div className="relative">
			<div
				className={cn(
					step.color,
					`absolute top-4 left-4 bg-linear-to-r bg-clip-text text-sm font-semibold text-transparent`,
				)}
			>
				{step.prefix}
			</div>

			<Textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={step.placeholder}
				className="min-h-30 rounded-2xl pt-10 text-lg focus:border-emerald-400 focus:ring-emerald-400"
			/>
		</div>
	);
}
