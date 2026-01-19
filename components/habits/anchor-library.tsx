// @ts-nocheck
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Coffee, Moon, Search, Sparkles, Sun } from "lucide-react";

import { Input } from "@/components/ui/input";

const anchors = {
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

const categoryIcons = {
	morning: Sun,
	meals: Coffee,
	work: Briefcase,
	evening: Moon,
};

const categoryColors = {
	morning: "from-amber-50 to-orange-50 border-amber-200",
	meals: "from-emerald-50 to-teal-50 border-emerald-200",
	work: "from-blue-50 to-indigo-50 border-blue-200",
	evening: "from-violet-50 to-purple-50 border-violet-200",
};

export default function AnchorLibrary({ onSelectAnchor, selectedAnchor }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [expandedCategory, setExpandedCategory] = useState(null);

	const filteredAnchors = Object.entries(anchors).reduce((acc, [category, items]) => {
		const filtered = items.filter((anchor) =>
			anchor.toLowerCase().includes(searchQuery.toLowerCase()),
		);
		if (filtered.length > 0) acc[category] = filtered;
		return acc;
	}, {});

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
				<Input
					placeholder="Search anchors..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="border-stone-200 bg-stone-50 pl-10 focus:border-emerald-400 focus:ring-emerald-400"
				/>
			</div>

			<div className="space-y-3">
				{Object.entries(filteredAnchors).map(([category, items]) => {
					const Icon = categoryIcons[category];
					const isExpanded = expandedCategory === category || searchQuery;

					return (
						<motion.div
							key={category}
							layout
							className={`rounded-2xl border bg-linear-to-br ${categoryColors[category]} overflow-hidden`}
						>
							<button
								onClick={() => setExpandedCategory(isExpanded && !searchQuery ? null : category)}
								className="flex w-full items-center justify-between p-4"
							>
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60">
										<Icon className="h-5 w-5 text-stone-600" />
									</div>
									<div className="text-left">
										<p className="font-medium text-stone-800 capitalize">{category}</p>
										<p className="text-xs text-stone-500">{items.length} anchors</p>
									</div>
								</div>
								<motion.div
									animate={{ rotate: isExpanded ? 180 : 0 }}
									className="flex h-6 w-6 items-center justify-center rounded-full bg-white/60"
								>
									<svg
										className="h-4 w-4 text-stone-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</motion.div>
							</button>

							<AnimatePresence>
								{isExpanded && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										className="overflow-hidden"
									>
										<div className="space-y-2 px-4 pb-4">
											{items.map((anchor, idx) => (
												<motion.button
													key={idx}
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: idx * 0.03 }}
													onClick={() => onSelectAnchor(anchor, category)}
													className={`w-full rounded-xl p-3 text-left text-sm transition-all ${
														selectedAnchor === anchor
															? "bg-white text-stone-900 shadow-md ring-2 ring-emerald-400"
															: "bg-white/50 text-stone-700 hover:bg-white hover:shadow-sm"
													}`}
												>
													<span className="font-medium text-emerald-600">After</span>{" "}
													{anchor.replace("After ", "")}
												</motion.button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					);
				})}
			</div>

			<div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
				<Sparkles className="h-4 w-4 flex-shrink-0 text-amber-600" />
				<p className="text-xs text-amber-800">
					Choose an anchor that happens reliably every day — consistency is key!
				</p>
			</div>
		</div>
	);
}
