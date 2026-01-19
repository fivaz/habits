"use client";
import Home from "@/components/habits/home";
import QueryProvider from "@/components/query-provider";

export default function HomePage() {
	return (
		<QueryProvider>
			<Home />
		</QueryProvider>
	);
}
