import { anchorCategoryUIArgs } from "@/lib/category/type";
import { Prisma } from "@/lib/generated/prisma/client";

export const anchorCategoryUIWithSuggestionsArgs = {
	select: {
		...anchorCategoryUIArgs.select,
		suggestions: {
			select: {
				id: true,
				text: true,
				isActive: true,
			},
			where: { isActive: true },
			orderBy: { text: "asc" },
		},
	},
} satisfies Prisma.AnchorCategoryDefaultArgs;

export type AnchorCategoryWithSuggestionsUI = Prisma.AnchorCategoryGetPayload<
	typeof anchorCategoryUIWithSuggestionsArgs
>;
