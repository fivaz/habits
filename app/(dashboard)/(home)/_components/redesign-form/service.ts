import { LucideIcon } from "lucide-react";
import { Bell, HelpCircle, Minimize2 } from "lucide-react";

export type ReasonId = "too_hard" | "forgot" | "anchor_missing";

export interface TroubleshootingReason {
	id: ReasonId;
	icon: LucideIcon;
	title: string;
	subtitle: string;
	color: string;
	iconBg: string;
	iconColor: string;
	suggestions: string[];
}

export const reasons: TroubleshootingReason[] = [
	{
		id: "too_hard",
		icon: Minimize2,
		title: "It was too hard",
		subtitle: "The behavior needs to be tinier",
		color: "from-rose-50 to-pink-50 border-rose-200",
		iconBg: "bg-rose-100",
		iconColor: "text-rose-600",
		suggestions: [
			"Can you do just the first step?",
			"Can you do it for just 2 seconds?",
			"What's the tiniest version possible?",
		],
	},
	{
		id: "forgot",
		icon: Bell,
		title: "I forgot",
		subtitle: "The anchor needs improvement",
		color: "from-amber-50 to-orange-50 border-amber-200",
		iconBg: "bg-amber-100",
		iconColor: "text-amber-600",
		suggestions: [
			"Is your anchor happening reliably?",
			"Can you attach a visual reminder?",
			"Would a different anchor work better?",
		],
	},
	{
		id: "anchor_missing",
		icon: HelpCircle,
		title: "My anchor didn't happen",
		subtitle: "The routine itself was disrupted",
		color: "from-blue-50 to-indigo-50 border-blue-200",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		suggestions: [
			"What anchor happens every day without fail?",
			"Can you chain to a more reliable routine?",
			"Consider morning anchors - they're most consistent",
		],
	},
];
