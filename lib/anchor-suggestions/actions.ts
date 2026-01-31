"use server";

import { anchorCategoryUIWithSuggestionsArgs } from "@/lib/anchor-suggestions/type";
import { logError } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export async function getAnchorSuggestions() {
	try {
		return prisma.anchorCategory.findMany({
			where: { isActive: true },
			orderBy: { name: "asc" },
			...anchorCategoryUIWithSuggestionsArgs,
		});
	} catch (error) {
		logError(error, "getAnchorSuggestions");
		throw new Error("Could not retrieve anchor suggestions.");
	}
}
