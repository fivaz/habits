import React from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { StepConfig } from "@/app/(dashboard)/(home)/_components/service";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NextButtonProps = {
	step: StepConfig;
	onNext: () => void;
};

export function NextButton({ step, onNext }: NextButtonProps) {
	return (
		<Button
			onClick={onNext}
			className={cn(
				step.color,
				"flex-1 rounded-xl bg-linear-to-r py-6 text-white hover:opacity-90",
			)}
		>
			Next
			<ArrowRight className="ml-2 h-4 w-4" />
		</Button>
	);
}

type PreviousButtonProps = {
	onPrevious: () => void;
};

export function PreviousButton({ onPrevious }: PreviousButtonProps) {
	return (
		<Button variant="outline" onClick={onPrevious} className="flex-1 rounded-xl py-6">
			<ArrowLeft className="mr-2 h-4 w-4" />
			Back
		</Button>
	);
}
