"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="flex items-center link text-neutral-500"
		>
			<IconArrowLeft />
			Назад
		</button>
	);
}
