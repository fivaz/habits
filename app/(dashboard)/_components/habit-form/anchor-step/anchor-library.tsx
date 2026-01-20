import React, { useState } from "react";

import { Search, Sparkles } from "lucide-react";

import { AnchorCategorySection } from "@/app/(dashboard)/_components/habit-form/anchor-step/anchor-category-section"; // Adjusted import path
import { Input } from "@/components/ui/input";

export type Category = "morning" | "meals" | "work" | "evening";

interface AnchorLibraryProps {
	setValue: (value: string, category?: string) => void;
	value: string;
}

const ANCHORS: Record<Category, string[]> = {
	morning: [
		"After my feet hit the floor",
		"After I turn off my alarm",
		"After I use the bathroom",
		"After I brush my teeth",
		"After I pour my morning coffee",
		"After I open my eyes",
		"After I stretch in bed",
		"After I look at myself in the mirror",
	],
	meals: [
		"After I start the coffee maker",
		"After I sit down to eat",
		"After I finish eating",
		"After I put my plate in the sink",
		"After I open the fridge",
		"After I take my first sip",
		"After I clear the table",
	],
	work: [
		"After I sit at my desk",
		"After I open my laptop",
		"After I close my laptop",
		"After I end a meeting",
		"After I send an email",
		"After I take a break",
		"After I check my calendar",
	],
	evening: [
		"After I close the front door",
		"After I change into comfortable clothes",
		"After I start the dishwasher",
		"After I turn off the TV",
		"After I set my alarm",
		"After I lay down in bed",
		"After I plug in my phone",
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
					className="border-stone-200 bg-stone-50 pl-10 focus:ring-emerald-400"
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
