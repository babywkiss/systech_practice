"use client";

import { Phone } from "@prisma/client";
import Link from "next/link";
import AddToBasketButton from "@/components/addToBasketButton";

export default function PhoneCard({ phone }: { phone: Phone }) {
	return (
		<div className="flex flex-col gap-3 p-3 w-72 rounded-lg">
			<Link
				href={`/items/${phone.id}`}
				className="flex gap-3 items-center text-xl"
			>
				<span className="font-bold">{phone.manufacturer}</span>
				<span>{phone.model}</span>
				{phone.available_quantity === 0 && (
					<span className="text-sm text-error">Нет в наличии</span>
				)}
			</Link>
			<Link className="flex justify-center w-full" href={`/items/${phone.id}`}>
				<img
					className="object-cover rounded-lg transition-all cursor-pointer hover:shadow-xl hover:scale-110 aspect-square"
					src={phone.imageLink}
				/>
			</Link>
			<span className="flex gap-2">
				Стоимость
				<span className="font-bold text-green-700">
					{phone.priceBYN / 100} BYN
				</span>
			</span>
			<AddToBasketButton phone={phone} />
		</div>
	);
}
