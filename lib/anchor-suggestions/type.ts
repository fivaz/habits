import { Prisma } from "@/lib/generated/prisma/client";

export const anchorCategoryUIArgs = {
	select: {
		id: true,
		name: true,
		icon: true,
		color: true,
		isActive: true,
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
	typeof anchorCategoryUIArgs
>;
