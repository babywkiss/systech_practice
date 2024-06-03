"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export let restoredPhoneId = null as number | null;

export default function BackButton({ phoneId }: { phoneId: number }) {
	useEffect(() => {
		restoredPhoneId = phoneId;
	}, []);

	const { back } = useRouter();

	return (
		<button
			onClick={() => {
				back();
			}}
			className="flex items-center link text-neutral-500"
		>
			<IconArrowLeft />
			Назад
		</button>
	);
}
