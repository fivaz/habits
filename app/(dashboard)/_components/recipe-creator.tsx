import React, { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { steps } from "@/app/(dashboard)/_components/data";
import {
	HabitData,
	HabitFormData,
	RecipeDialog,
} from "@/app/(dashboard)/_components/recipe-dialog";
import { RehearsalView } from "@/app/(dashboard)/_components/rehearsal-view";
import { StandardStepView } from "@/app/(dashboard)/_components/stand-step-view";
import { Button } from "@/components/ui/button";

interface RecipeCreatorProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (habit: HabitFormData) => void;
	editingHabit?: HabitData | null;
}

export function RecipeCreator({ isOpen, onClose, onSave, editingHabit }: RecipeCreatorProps) {
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

	// Logic Handlers
	const handleNext = () => {
		if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
	};

	const handleBack = () => {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	};

	const handleSave = () => {
		onSave({
			anchor: "After I " + formData.anchor,
			anchor_category: formData.anchor_category,
			tiny_behavior: "I will " + formData.tiny_behavior,
			celebration: "Then I will " + formData.celebration,
		});
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
			setRehearsalCount((prev) => prev + 1);
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

	const handleSelectAnchor = (anchor: string, category: string) => {
		setFormData({
			...formData,
			anchor: anchor.replace("After I ", "").replace("After ", ""),
			anchor_category: category,
		});
		setShowAnchorLibrary(false);
	};

	const isStepValid = getCurrentValue().trim().length > 0;

	return (
		<RecipeDialog
			isOpen={isOpen}
			onClose={onClose}
			currentStepIndex={currentStep}
			step={step}
			rehearsalCount={rehearsalCount}
			rehearsalTarget={rehearsalTarget}
			footer={
				step.id !== "rehearsal" && (
					<>
						{currentStep > 0 && (
							<Button variant="outline" onClick={handleBack} className="flex-1 rounded-xl py-6">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back
							</Button>
						)}
						<Button
							onClick={handleNext}
							disabled={!isStepValid}
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
					</>
				)
			}
		>
			{step.id === "rehearsal" ? (
				<RehearsalView
					step={step}
					formData={formData}
					rehearsalCount={rehearsalCount}
					rehearsalTarget={rehearsalTarget}
					onRehearse={handleRehearsal}
				/>
			) : (
				<StandardStepView
					step={step}
					value={getCurrentValue()}
					onChange={setCurrentValue}
					showAnchorLibrary={showAnchorLibrary}
					toggleAnchorLibrary={() => setShowAnchorLibrary(!showAnchorLibrary)}
					onSelectAnchor={handleSelectAnchor}
				/>
			)}
		</RecipeDialog>
	);
}
