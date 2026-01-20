import { BrainIcon } from "lucide-react";


type MissingRehearsalBadgeProps = {
	onStartRehearsal: () => void;
};

export function MissingRehearsalBadge({ onStartRehearsal }: MissingRehearsalBadgeProps) {
	return (
		<button
			onClick={onStartRehearsal}
			className="flex cursor-pointer items-center gap-1.5 rounded-full bg-linear-to-br from-purple-500 to-violet-600 px-2.5 py-1 text-white hover:shadow-lg"
		>
			<BrainIcon className="h-3 w-3" />
			<span className="text-xs font-medium capitalize">Missing Rehearsal</span>
		</button>
	);
}
