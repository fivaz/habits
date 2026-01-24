"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function HeaderPortal({ children }: { children: ReactNode }) {
	const [target, setTarget] = useState<HTMLElement | null>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTarget(document.getElementById("header-actions"));
	}, []);

	if (!target) return null;

	return createPortal(children, target);
}
