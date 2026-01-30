import { prisma } from "@/lib/prisma";

/**
 * ------------------------------------------------------------------
 * Canonical Anchor Categories
 * ------------------------------------------------------------------
 */

export const CATEGORIES = {
	morning: {
		icon: "Sun",
		color:
			"text-amber-500 dark:text-amber-600 from-amber-50 to-orange-50 border-amber-200 dark:from-amber-100 dark:to-orange-100 dark:border-amber-300",
		order: 0,
	},
	work: {
		icon: "Briefcase",
		color:
			"text-indigo-500 dark:text-indigo-600 from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-100 dark:to-indigo-100 dark:border-blue-300",
		order: 1,
	},
	// default category other will be order 2
	meals: {
		icon: "Coffee",
		color:
			"text-emerald-500 dark:text-emerald-600 from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-100 dark:to-teal-100 dark:border-emerald-300",
		order: 3,
	},
	evening: {
		icon: "Moon",
		color:
			"text-violet-500 dark:text-violet-600 from-violet-50 to-purple-50 border-violet-200 dark:from-violet-100 dark:to-purple-100 dark:border-violet-300",
		order: 4,
	},
} as const;

export type AnchorCategoryKey = keyof typeof CATEGORIES;

/**
 * ------------------------------------------------------------------
 * Anchor Suggestions
 * ------------------------------------------------------------------
 */

export const ANCHORS: Record<AnchorCategoryKey, readonly string[]> = {
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

/**
 * ------------------------------------------------------------------
 * Seed Helper
 * ------------------------------------------------------------------
 */

export async function seedAnchorCategories(): Promise<Record<AnchorCategoryKey, { id: string }>> {
	console.log("🌱 Seeding anchor categories & suggestions...");

	const categoryMap = {} as Record<AnchorCategoryKey, { id: string }>;

	for (const categoryKey of Object.keys(CATEGORIES) as AnchorCategoryKey[]) {
		const meta = CATEGORIES[categoryKey];

		const category = await prisma.anchorCategory.upsert({
			where: { name: categoryKey },
			update: {
				icon: meta.icon,
				color: meta.color,
				order: meta.order,
				isActive: true,
			},
			create: {
				name: categoryKey,
				icon: meta.icon,
				color: meta.color,
				order: meta.order,
				isActive: true,
			},
		});

		categoryMap[categoryKey] = { id: category.id };

		await prisma.anchorSuggestion.createMany({
			data: ANCHORS[categoryKey].map((text) => ({
				text,
				isActive: true,
				anchorCategoryId: category.id,
			})),
		});
	}

	console.log("✅ Anchor categories seeded");

	return categoryMap;
}
