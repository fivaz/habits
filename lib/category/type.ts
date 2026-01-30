import {
	BriefcaseIcon,
	CoffeeIcon,
	FunnelXIcon,
	LucideIcon,
	MoonIcon,
	SunIcon,
} from "lucide-react";

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
	FunnelX: FunnelXIcon,
};

export const defaultAnchorCategory: AnchorCategoryUI = {
	id: "",
	name: "other",
	icon: "Sun",
	order: 2,
	color: "stone",
	isActive: true,
};

export const COLOR_MAP = {
	amber: {
		text: "text-amber-500 dark:text-amber-600",
		border: "border-amber-200 dark:border-amber-300",
		background: "bg-amber-50 dark:bg-amber-100",
		accent: "bg-amber-200 dark:bg-amber-300",
	},
	indigo: {
		text: "text-indigo-500 dark:text-indigo-600",
		border: "border-blue-200 dark:border-indigo-300",
		background: "bg-blue-50 dark:bg-blue-100",
		accent: "bg-blue-200 dark:bg-indigo-200",
	},
	emerald: {
		text: "text-emerald-500 dark:text-emerald-600",
		border: "border-emerald-200 dark:border-emerald-300",
		background: "bg-emerald-50 dark:bg-emerald-100",
		accent: "bg-emerald-200 dark:bg-emerald-300",
	},
	violet: {
		text: "text-violet-500 dark:text-violet-600",
		border: "border-violet-200 dark:border-violet-300",
		background: "bg-violet-50 dark:bg-violet-100",
		accent: "bg-violet-200 dark:bg-violet-300",
	},
	stone: {
		text: "text-stone-500 dark:text-stone-600",
		border: "border-stone-200 dark:border-stone-300",
		background: "bg-stone-50 dark:bg-stone-100",
		accent: "bg-stone-200 dark:bg-stone-300",
	},
} as const;

export type ColorName = keyof typeof COLOR_MAP;

export function getColorClass(color: string) {
	return COLOR_MAP[color as ColorName] ?? COLOR_MAP.stone;
}
