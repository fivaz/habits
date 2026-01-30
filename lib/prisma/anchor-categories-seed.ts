import { prisma } from "@/lib/prisma";

/**
 * ------------------------------------------------------------------
 * Canonical Anchor Categories
 * ------------------------------------------------------------------
 */

export const CATEGORIES = {
	morning: {
		icon: "Sun",
		color: "amber",
		order: 0,
	},
	work: {
		icon: "Briefcase",
		color: "indigo",
		order: 1,
	},
	// default category "other" will be order 2
	meals: {
		icon: "Coffee",
		color: "emerald",
		order: 3,
	},
	evening: {
		icon: "Moon",
		color: "violet",
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
