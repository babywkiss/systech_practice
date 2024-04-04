"use client";

import { Phone } from "@prisma/client";
import Link from "next/link";
import AddToBasketButton from "@/components/addToBasketButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PhoneControl from "@/components/admin/phoneControl";

export default function PhoneCard({ phone }: { phone: Phone }) {
	const isAdmin = useSelector((state: RootState) => state.user?.isAdmin);

	return (
		<div className="flex flex-col gap-3 p-3 w-full rounded-lg bg-base-200 md:w-fit hover:bg-base-100">
			<div className="flex justify-between items-center group">
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
				<div className="invisible group-hover:visible">
					{isAdmin && <PhoneControl phone={phone} />}
				</div>
			</div>
			<Link className="flex justify-center w-full" href={`/items/${phone.id}`}>
				<img
					className="object-cover w-72 rounded-lg transition-all cursor-pointer hover:shadow-xl aspect-square"
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
