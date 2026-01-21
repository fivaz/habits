"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence } from "framer-motion";
import { HomeIcon, Settings2Icon, TrendingUpIcon } from "lucide-react";

import { GreetingsPanel } from "@/app/(dashboard)/_components/greetings-panel";
import { HabitCard } from "@/app/(dashboard)/_components/habit-card/habit-card";
import { Onboarding } from "@/app/(dashboard)/_components/onboarding";
import { Logo } from "@/components/logo";
import { ROUTES } from "@/lib/consts";
import { cn } from "@/lib/utils";

type AppLayoutProps = {
	children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
	const pathname = usePathname();

	const navItems = [
		{ icon: HomeIcon, label: "Home", href: ROUTES.HOME },
		{ icon: TrendingUpIcon, label: "Progress", href: ROUTES.PROGRESS },
		{ icon: Settings2Icon, label: "Settings", href: ROUTES.SETTINGS },
	];

	return (
		<>
			<header className="bg-background border-border sticky top-0 right-0 left-0 z-20 border-b">
				<div className="px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200">
								<Logo className="size-6" />
							</div>
							<div>
								<GreetingsPanel />
								<h1 className="text-lg font-bold text-stone-800 dark:text-gray-200">Tiny Habits</h1>
							</div>
						</div>
						<div id="header-actions" />
					</div>
				</div>
			</header>

			<main className="relative flex flex-1 flex-col overflow-auto">{children}</main>

			{/* Persistent Bottom Navigation */}
			<nav className="bg-background border-border sticky right-0 bottom-0 left-0 z-50 border-t px-2 py-2 pb-5">
				<div className="mx-auto flex max-w-md items-center justify-around">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={isActive ? "page" : undefined}
								className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
									isActive
										? "bg-green-50 text-green-500 dark:bg-green-500/10"
										: "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
								}`}
							>
								<Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
								<span className="mt-0.5 text-[10px] font-medium">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
