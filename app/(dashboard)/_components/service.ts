import { AnchorIcon, BrainIcon, LucideIcon, PartyPopperIcon, ZapIcon } from "lucide-react";

export interface StepConfig {
	id: "anchor" | "behavior" | "celebration" | "rehearsal";
	title: string;
	subtitle: string;
	icon: LucideIcon;
	color: string;
	bgColor: string;
	prefix?: string;
	placeholder?: string;
	tip: string;
}

export enum Step {
	ANCHOR,
	BEHAVIOR,
	CELEBRATION,
	REHEARSAL,
}

export const steps: StepConfig[] = [
	{
		id: "anchor",
		title: "Choose Your Anchor",
		subtitle: "What existing routine will trigger your new behavior?",
		icon: AnchorIcon,
		color: "from-blue-500 to-indigo-500",
		bgColor: "from-blue-50 to-indigo-50 dark:from-blue-200 dark:to-indigo-200",
		prefix: "After I",
		placeholder: "pour my morning coffee...",
		tip: "Pick something you already do reliably every day. The more consistent, the better!",
	},
	{
		id: "behavior",
		title: "Design Your Tiny Behavior",
		subtitle: "What super small action will you take? (under 30 seconds!)",
		icon: ZapIcon,
		color: "from-emerald-500 to-green-600",
		bgColor: "from-emerald-50 to-green-100 dark:from-emerald-200 dark:to-green-200",
		prefix: "I will",
		placeholder: "take one deep breath...",
		tip: "Make it tiny! If you can't do it in 30 seconds or less, shrink it down.",
	},
	{
		id: "celebration",
		title: "Pick Your Celebration",
		subtitle: "How will you create a positive feeling right after?",
		icon: PartyPopperIcon,
		color: "from-amber-500 to-orange-500",
		bgColor: "from-amber-50 to-orange-50 dark:from-amber-200 dark:to-orange-200",
		prefix: "Then I will",
		placeholder: 'say "Awesome!" and smile...',
		tip: "This is the secret sauce! A genuine positive emotion wires the tiny habit into your brain.",
	},
	{
		id: "rehearsal",
		title: "Rehearsal Time!",
		subtitle: "Practice it 5 times right now to jumpstart your neural pathways.",
		icon: BrainIcon,
		color: "from-purple-500 to-violet-600",
		bgColor: "from-purple-50 to-violet-100 dark:from-purple-200 dark:to-violet-200",
		tip: "Rehearsing creates neural pathways. The more you practice the sequence, the more automatic it becomes!",
	},
];

export const REHEARSAL_TARGET = 5;
