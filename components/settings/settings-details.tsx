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
		<>
			{/* Account Row */}
			<div className="mb-6">
				<motion.button
					onClick={() => setIsUserOpen(true)}
					className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm transition-transform active:scale-[0.98] dark:bg-gray-800"
				>
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-xl font-bold text-white shadow-inner">
						{session.user.name?.charAt(0) || "?"}
					</div>
					<div className="flex-1">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
							{session.user.name}
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</p>
					</div>
					<ChevronRight className="h-5 w-5 text-gray-300" />
				</motion.button>
			</div>

			<div className="space-y-6 pb-8">
				{/* Preferences Row */}
				<div>
					<h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
						Preferences
					</h3>
					<div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
						<div className="flex items-center justify-between p-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
									<Palette className="h-5 w-5 text-gray-600 dark:text-gray-300" />
								</div>
								<span className="font-medium dark:text-white">Theme</span>
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
						<LogOut className="mr-2 h-5 w-5" /> Sign Out
					</Button>
					<div className="opacity-30">
						<span className="text-[10px] font-bold tracking-widest uppercase dark:text-white">
							Built with Passion
						</span>
						<p className="text-xs font-medium dark:text-white">
							Version {process.env.NEXT_PUBLIC_APP_VERSION}
						</p>
					</div>
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
		</>
	);
}
