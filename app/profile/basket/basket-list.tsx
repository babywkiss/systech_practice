"use client";

import { removeItemFromBasket } from "@/app/store/basketSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import Image from "next/image";
import Link from "next/link";

export default function BasketList() {
	const dispatch = useAppDispatch();

	const basket = useAppSelector((state) => state.basket.data);

	return (
		<div>
			{basket.length > 0 ? (
				<div className="flex overflow-auto flex-wrap gap-3 justify-center items-center">
					{basket.map(({ phone, count }) => (
						<div key={phone.id} className="flex flex-col gap-2 shrink-0">
							<div className="relative h-48 aspect-square">
								<Image
									width={300}
									height={300}
									alt="Phone Image"
									className="object-cover rounded-lg"
									src={phone.imageLink}
								/>
							</div>
							<span className="font-bold">
								{phone.manufacturer} - {phone.model}
							</span>
							<Link href={`/items/${phone.id}`} className="btn btn-sm">
								Подробнее
							</Link>
							<button
								onClick={() => {
									dispatch(removeItemFromBasket(phone));
								}}
								className="btn btn-error btn-sm"
							>
								Удалить из корзины
							</button>
							<span className="flex gap-2 justify-center items-center font-bold text-success">
								<div className="badge badge-success">
									{phone.priceBYN / 100} BYN
								</div>
								x {count}
							</span>
						</div>
					))}
				</div>
			) : (
				<span className="text-3xl font-bold text-neutral-500">
					В корзине ничего нет
				</span>
			)}
		</div>
	);
}
