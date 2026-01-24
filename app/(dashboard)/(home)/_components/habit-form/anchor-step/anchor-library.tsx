import React, { useState } from "react";

import { Search, Sparkles } from "lucide-react";

import { AnchorCategorySection } from "@/app/(dashboard)/(home)/_components/habit-form/anchor-step/anchor-category-section"; // Adjusted import path
import { Input } from "@/components/ui/input";

export type Category = "morning" | "meals" | "work" | "evening";

interface AnchorLibraryProps {
	setValue: (value: string, category?: string) => void;
	value: string;
}

const ANCHORS: Record<Category, string[]> = {
	morning: [
		"place my feet on the floor",
		"turn off my alarm",
		"use the bathroom",
		"brush my teeth",
		"pour my morning coffee",
		"open my eyes",
		"stretch in bed",
		"look at myself in the mirror",
	],
	meals: [
		"start the coffee maker",
		"sit down to eat",
		"finish eating",
		"put my plate in the sink",
		"open the fridge",
		"take my first sip",
		"clear the table",
	],
	work: [
		"sit at my desk",
		"open my laptop",
		"close my laptop",
		"end a meeting",
		"send an email",
		"take a break",
		"check my calendar",
	],
	evening: [
		"close the front door",
		"change into comfortable clothes",
		"start the dishwasher",
		"turn off the TV",
		"set my alarm",
		"lay down in bed",
		"plug in my phone",
	],
};

export function AnchorLibrary({ setValue, value }: AnchorLibraryProps) {
	const [search, setSearch] = useState("");
	const [expanded, setExpanded] = useState<Category | null>(null);

	const categoryKeys = Object.keys(ANCHORS) as Category[];

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
				<Input
					placeholder="Search anchors..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border-border bg-stone-50 pl-10 focus:ring-emerald-400"
				/>
			</div>

			<div className="space-y-3">
				{categoryKeys.map((cat) => {
					// Inline filtering logic
					const filteredItems = ANCHORS[cat].filter((i) =>
						i.toLowerCase().includes(search.toLowerCase()),
					);

					if (filteredItems.length === 0) return null;

					return (
						<AnchorCategorySection
							key={cat}
							category={cat}
							items={filteredItems}
							selectedValue={value}
							isExpanded={!!search || expanded === cat}
							onToggle={() => setExpanded(expanded === cat ? null : cat)}
							onSelect={setValue}
						/>
					);
				})}
			</div>

			<div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
				<Sparkles className="h-4 w-4 shrink-0 text-amber-600" />
				<p className="text-xs text-amber-800">
					Choose an anchor that happens reliably every day — consistency is key!
				</p>
			</div>
		</div>
	);
}
