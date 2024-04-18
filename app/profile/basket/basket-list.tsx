"use client";

import { removeItemFromBasket } from "@/app/store/basket-slice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { IconBan } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function BasketList() {
	const dispatch = useAppDispatch();

	const basket = useAppSelector((state) => state.basket.data);

	return (
		<>
			{basket.length > 0 ? (
				<div className="flex overflow-auto gap-3 items-center p-2 h-full rounded-lg md:flex-wrap md:justify-center bg-base-100">
					{basket.map(({ phone, count }) => (
						<div
							key={phone.id}
							className="flex flex-col gap-2 p-3 rounded-lg shrink-0 bg-base-200"
						>
							{phone.imageLink ? (
								<Image
									width={300}
									height={300}
									alt="Phone Image"
									className="object-cover w-48 h-48 rounded-lg"
									src={phone.imageLink}
								/>
							) : (
								<div className="flex flex-col gap-3 justify-center items-center w-48 aspect-square text-neutral-500">
									<IconBan size={100} />
									<span>Нет изображения</span>
								</div>
							)}
							<span className="font-bold">
								{phone.manufacturer} - {phone.model}
							</span>
							<Link href={`/catalog/${phone.id}`} className="btn btn-sm">
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
		</>
	);
}
