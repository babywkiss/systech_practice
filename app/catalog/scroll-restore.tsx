"use client";

import { useEffect } from "react";
import { restoredPhoneId } from "./[id]/back-button";

export default function ScrollRestore() {
	useEffect(() => {
		console.log(restoredPhoneId);
		const phoneCard = document.getElementById(`phone-${restoredPhoneId}`);
		phoneCard?.scrollIntoView();
	});
	return null;
}
