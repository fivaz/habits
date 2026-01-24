import { BrainIcon } from "lucide-react";

type MissingRehearsalBadgeProps = {
	onStartRehearsal: () => void;
};

export function MissingRehearsalBadge({ onStartRehearsal }: MissingRehearsalBadgeProps) {
	return (
		<button
			onClick={onStartRehearsal}
			className="flex cursor-pointer items-center gap-1.5 rounded-full bg-linear-to-br from-violet-200 to-violet-300 px-2.5 py-1 text-violet-600 hover:shadow-lg"
		>
			<BrainIcon className="size-3" />
			<span className="text-xs font-medium capitalize">Pending!</span>
		</button>
	);
}
