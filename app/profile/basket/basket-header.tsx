"use client";

import { useAppSelector } from "@/app/store/store";
import { calcBasketTotalPrice, formatPrice } from "@/app/utils";
import { IconBasket } from "@tabler/icons-react";
import Link from "next/link";

export default function BasketHeader() {
	const basket = useAppSelector((state) => state.basket.data);
	const totalPrice = calcBasketTotalPrice(basket);

	return (
		<div className="flex flex-col gap-3 justify-between w-full md:flex-row md:items-center">
			<span className="flex gap-3 items-center text-xl font-bold">
				<IconBasket />
				Ваша корзина
			</span>
			{basket.length > 0 && (
				<Link href="/pay" type="submit" role="link" className="btn btn-success">
					Оформить заказ
					<div className="badge badge-neutral">
						{formatPrice(totalPrice)} BYN
					</div>
				</Link>
			)}
		</div>
	);
}
