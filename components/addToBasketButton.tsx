"use client";

import { addItemToBasket } from "@/app/store/basketSlice";
import { Phone } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/app/store/store";

const useCountInBasket = (phone: Phone) =>
	useSelector(
		(state: RootState) =>
			state.basket.data.find((data) => data.phone.id === phone.id)?.count ?? 0,
	);

export default function AddToBasketButton({ phone }: { phone: Phone }) {
	const dispatch = useDispatch();
	const countInBasket = useCountInBasket(phone);
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
