import * as React from "react";

import { SettingsDetails } from "@/components/settings/settings-details";

export default async function SettingsPage() {
	return (
		<div className="relative flex w-full flex-col px-5">
			{/* Header */}
			<div className="flex items-start justify-between pb-4">
				<div>
					<h1 className="text-foreground text-2xl font-bold">Settings</h1>
				</div>
			</div>
			<SettingsDetails />
		</div>
	);
}
