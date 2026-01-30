"use client";

import { useState } from "react";

import { Search, Sparkles } from "lucide-react";
import useSWR from "swr";

import { AnchorCategorySection } from "@/app/(dashboard)/(home)/_components/habit-form/anchor-step/anchor-category-section";
import { Input } from "@/components/ui/input";
import { getAnchorSuggestions } from "@/lib/anchor-suggestions/actions";
import { AnchorCategoryWithSuggestionsUI } from "@/lib/anchor-suggestions/type";
import { AnchorCategoryUI } from "@/lib/category/type";

interface AnchorLibraryProps {
	setAnchor: (anchor: string, category?: AnchorCategoryUI) => void;
	value: string;
}

const fetcher = () => getAnchorSuggestions();

export function AnchorLibrary({ setAnchor, value }: AnchorLibraryProps) {
	const [search, setSearch] = useState("");
	const [expanded, setExpanded] = useState<string | null>(null);

	const { data, isLoading } = useSWR<AnchorCategoryWithSuggestionsUI[]>(
		"anchor-suggestions",
		fetcher,
	);

	if (isLoading) {
		return <p className="text-muted-foreground text-sm">Loading anchors…</p>;
	}

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
				{data?.map((category) => {
					const filteredItems = category.suggestions
						.map((s) => s.text)
						.filter((text) => text.toLowerCase().includes(search.toLowerCase()));

					if (filteredItems.length === 0) return null;

					return (
						<AnchorCategorySection
							key={category.id}
							category={category}
							selectedValue={value}
							isExpanded={!!search || expanded === category.id}
							onToggle={() => setExpanded(expanded === category.id ? null : category.id)}
							onSelect={(anchor) => setAnchor(anchor, category)}
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
