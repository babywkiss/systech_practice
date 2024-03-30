"use client";

import { Phone } from "@prisma/client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../store/userSlice";

export default function PhoneCard({ phone }: { phone: Phone }) {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-3 p-3 bg-blue-100 rounded-lg w-fit h-fit">
			<Link
				href={`/items/${phone.id}`}
				className="flex gap-3 items-center text-xl"
			>
				<span className="font-bold">{phone.manufacturer}</span>
				<span>{phone.model}</span>
			</Link>
			<img className="h-64 rounded-lg aspect-square" src={phone.imageLink} />
			<span className="flex gap-2">
				Стоимость
				<span className="font-bold text-green-700">
					{phone.priceBYN / 100} BYN
				</span>
			</span>
			<button
				onClick={() => {
					dispatch(addItemToBasket(phone));
				}}
				className="bg-green-500 btn btn-filled"
			>
				Добавить в корзину
			</button>
		</div>
	);
}
