"use client";

import { IconBasket } from "@tabler/icons-react";
import Link from "next/link";
import { useAppSelector } from "../store/store";

export default function BasketLink() {
	const basket = useAppSelector((state) => state.basket.data);

	return (
		<Link className="btn btn-ghost" href="/profile/basket">
			<IconBasket />
			<div className="badge badge-secondary">
				{basket.reduce((total, { count }) => total + count, 0)}
			</div>
		</Link>
	);
}
