"use client";

import { addItemToBasket } from "@/app/store/basket-slice";
import { Phone } from "@prisma/client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/store/store";
import toast from "react-hot-toast";

export default function AddToBasketButton({ phone }: { phone: Phone }) {
	const dispatch = useDispatch();
	const countInBasket =
		useAppSelector((state) =>
			state.basket.data.find(({ phone: { id } }) => id === phone.id),
		)?.count ?? 0;

	return (
		<button
			disabled={
				phone.available_quantity < 1 ||
				phone.available_quantity <= countInBasket
			}
			className="btn btn-filled btn-success"
			onClick={() => {
				dispatch(addItemToBasket(phone));
				toast(`Товар ${phone.model} добавлен в корзину!`);
			}}
		>
			<span>Добавить в корзину</span>
			{countInBasket > 0 && (
				<div className="badge">В корзине: {countInBasket}</div>
			)}
		</button>
	);
}
