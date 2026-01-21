import { Coffee, Moon, Sun } from "lucide-react";

export function GreetingsPanel() {
	// Define time-of-day objects
	const timesOfDay = [
		{
			name: "morning",
			startHour: 0,
			endHour: 12,
			text: "Good morning",
			icon: Sun,
			colorClass: "text-yellow-500 dark:text-yellow-400",
		},
		{
			name: "afternoon",
			startHour: 12,
			endHour: 17,
			text: "Good afternoon",
			icon: Coffee,
			colorClass: "text-orange-500 dark:text-orange-400",
		},
		{
			name: "evening",
			startHour: 17,
			endHour: 24,
			text: "Good evening",
			icon: Moon,
			colorClass: "text-blue-500 dark:text-blue-400",
		},
	];

	const getGreeting = () => {
		const hour = new Date().getHours();
		// Find the time-of-day object that matches the current hour
		return timesOfDay.find((t) => hour >= t.startHour && hour < t.endHour) || timesOfDay[0];
	};

	const greeting = getGreeting();
	const GreetingIcon = greeting.icon;

	return (
		<p className={`flex items-center gap-1 text-xs ${greeting.colorClass}`}>
			<GreetingIcon className="h-3 w-3" />
			{greeting.text}
		</p>
	);
}
