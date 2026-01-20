import { Coffee, Moon, Sun } from "lucide-react";

export function GreetingsPanel() {
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return { text: "Good morning", icon: Sun };
		if (hour < 17) return { text: "Good afternoon", icon: Coffee };
		return { text: "Good evening", icon: Moon };
	};

	const greeting = getGreeting();
	const GreetingIcon = greeting.icon;
	return (
		<p className="flex items-center gap-1 text-xs text-stone-500">
			<GreetingIcon className="h-3 w-3" />
			{greeting.text}
		</p>
	);
}
