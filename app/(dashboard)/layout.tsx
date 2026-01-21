"use client";

import { ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";
import { TimezoneProvider } from "@/components/timezone-sync";
import { cn } from "@/lib/utils";

type DashboardLayoutType = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutType) {
	return (
		<AppLayout>
			<TimezoneProvider />
			{children}
		</AppLayout>
	);
}
