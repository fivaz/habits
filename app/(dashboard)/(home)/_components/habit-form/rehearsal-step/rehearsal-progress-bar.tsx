import React from "react";

import { motion } from "framer-motion";

import { REHEARSAL_TARGET } from "@/lib/habits/type";

type ReHearsalProgressBarProps = {
	rehearsalCount: number;
};

export function RehearsalProgressBar({ rehearsalCount }: ReHearsalProgressBarProps) {
	return (
		<div className="mb-4">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-xs text-stone-600">Rehearsals completed</span>
				<span className="text-sm font-bold text-purple-600">
					{rehearsalCount}/{REHEARSAL_TARGET}
				</span>
			</div>
			<div className="h-2 overflow-hidden rounded-full bg-stone-200">
				<motion.div
					animate={{ width: `${(rehearsalCount / REHEARSAL_TARGET) * 100}%` }}
					className="h-full rounded-full bg-linear-to-r from-purple-500 to-violet-600"
					transition={{ duration: 0.3 }}
				/>
			</div>
		</div>
	);
}
