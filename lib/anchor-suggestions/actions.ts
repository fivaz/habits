"use server";

import { anchorCategoryUIWithSuggestionsArgs } from "@/lib/anchor-suggestions/type";
import { prisma } from "@/lib/prisma";

export async function getAnchorSuggestions() {
	return prisma.anchorCategory.findMany({
		where: { isActive: true },
		orderBy: { name: "asc" },
		...anchorCategoryUIWithSuggestionsArgs,
	});
}
