"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PagesSetter({ totalPages }: { totalPages: number }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		params.set("total", totalPages.toString());
		replace(`${pathname}?${params.toString()}`);
	}, []);
	return null;
}
