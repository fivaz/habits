"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ChevronRight, LogOut, Palette } from "lucide-react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/settings/theme-toggle";
import { UserForm } from "@/components/settings/user-form";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { ROUTES } from "@/lib/consts";
import { logError } from "@/lib/logger";

export function SettingsDetails() {
	const [isPendingSignOut, setIsPendingSignOut] = useState(false);
	const { data: session } = useSession();

	const [isUserOpen, setIsUserOpen] = useState(false);
	const router = useRouter();

	if (!session) return null;

	const handleSignOut = async () => {
		setIsPendingSignOut(true);
		try {
			await signOut();
			router.push(ROUTES.LOGIN);
		} catch (error) {
			logError(error, "SettingsDetails#handleSignOut");
			toast.error("Failed to sign out. Please try again.");
		} finally {
			setIsPendingSignOut(false);
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-5 p-5">
			<h1 className="text-2xl">Settings</h1>
			{/* Account Row */}
			<motion.button
				onClick={() => setIsUserOpen(true)}
				className="bg-card flex w-full items-center gap-4 rounded-2xl p-5 text-left shadow-sm transition-transform active:scale-[0.98]"
			>
				<div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-inner">
					{session.user.name?.charAt(0) || "?"}
				</div>
				<div className="flex-1">
					<h2 className="text-foreground text-lg font-semibold">{session.user.name}</h2>
					<p className="text-muted-foreground text-sm">{session.user.email}</p>
				</div>
				<ChevronRight className="text-foreground size-5" />
			</motion.button>

			{/* Preferences Row */}
			<div className="flex-1 grow">
				<h3 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
					Preferences
				</h3>
				<div className="bg-card overflow-hidden rounded-2xl shadow-sm">
					<div className="flex items-center justify-between p-4">
						<div className="flex items-center gap-3">
							<div className="bg-accent flex size-10 items-center justify-center rounded-xl">
								<Palette className="text-primary size-5" />
							</div>
							<span className="text-foreground font-medium">Theme</span>
						</div>
						<ThemeToggle />
					</div>
				</div>
			</div>

			{/* Version & Logout */}
			<div className="pt-2 text-center">
				<Button
					onClick={handleSignOut}
					disabled={isPendingSignOut}
					variant="outline"
					className="mb-6 h-12 w-full rounded-xl border-red-200 bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-600 dark:border-red-900/30"
				>
					<LogOut className="mr-2 size-5" /> Sign Out
				</Button>
				<div className="opacity-30">
					<span className="text-[10px] font-bold tracking-widest uppercase">
						Built with Passion
					</span>
					<p className="text-xs font-medium">Version {process.env.NEXT_PUBLIC_APP_VERSION}</p>
				</div>
			</div>

			<UserForm
				isOpen={isUserOpen}
				onClose={() => {
					toast.error("User update is not implemented yet.");
					setIsUserOpen(false);
				}}
				user={session.user}
			/>
		</div>
	);
}
