"use client";

import { ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";
import { TimezoneProvider } from "@/components/timezone-sync";
import { cn } from "@/lib/utils";

type DashboardLayoutType = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutType) {
	const withPadding = true;

	return (
		<AppLayout className={cn({ "pt-6 pb-20": withPadding })}>
			<TimezoneProvider />
			{children}
		</AppLayout>
	);
}
