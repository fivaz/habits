import { BriefcaseIcon, CoffeeIcon, LucideIcon, MoonIcon, SunIcon } from "lucide-react";

import { Prisma } from "@/lib/generated/prisma/client";

export const anchorCategoryUIArgs = {
	select: {
		id: true,
		name: true,
		icon: true,
		color: true,
		order: true,
		isActive: true,
	},
} satisfies Prisma.AnchorCategoryDefaultArgs;

export type AnchorCategoryUI = Prisma.AnchorCategoryGetPayload<typeof anchorCategoryUIArgs>;

export const ICONS: Record<string, LucideIcon> = {
	Sun: SunIcon,
	Coffee: CoffeeIcon,
	Briefcase: BriefcaseIcon,
	Moon: MoonIcon,
};
