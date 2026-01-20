"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppLayout } from "@/components/app-layout";
import { cn } from "@/lib/utils";

type DashboardLayoutType = {
	children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutType) {
	const pathname = usePathname();

	const withPadding = false;

	return <AppLayout className={cn({ "px-5 pt-12 pb-20": withPadding })}>{children}</AppLayout>;
}
