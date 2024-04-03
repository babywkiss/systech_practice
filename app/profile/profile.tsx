"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeItemFromBasket } from "../store/basketSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { Phone } from "@prisma/client";
import Link from "next/link";
import { IconBasket } from "@tabler/icons-react";

const getCountedBasket = (phones: Phone[]) =>
	Array.from(
		phones
			.reduce(
				(basket, phone) =>
					basket.set(phone.id, {
						phone,
						count: (basket.get(phone.id)?.count ?? 0) + 1,
					}),
				new Map<number, { phone: Phone; count: number }>(),
			)
			.values(),
	);

export default function Profile() {
	// TODO: add pay page
	const user = useSelector((state: RootState) => state.user);
	const basket = useSelector((state: RootState) => state.basket.data);
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = async () => {
		await fetch("/api/logout");
		router.replace("/");
		router.refresh();
	};

	const totalBasketPrice =
		basket.reduce((total, phone) => total + phone.priceBYN, 0) / 100;
	return (
		<div className="flex flex-col gap-5 w-full">
			{user ? (
				<div className="flex flex-col gap-3 justify-between md:flex-row md:items-center">
					<div className="flex flex-col gap-3">
						<span className="text-2xl font-bold">{user.email}</span>
						<div className="badge badge-info badge-lg">
							Аккаунт создан: {user.created.toString().split("T")[0]}
						</div>
					</div>
					<button onClick={logout} className="btn btn-error w-fit">
						Выйти из аккаунта
					</button>
				</div>
			) : (
				<Link href="/auth/login" className="btn btn-primary md:w-fit">
					Войти в аккаунт
				</Link>
			)}
			<div className="flex gap-5 items-center text-neutral-500">
				<IconBasket className="" size="50" />
				<span className="text-xl font-bold md:text-3xl">Ваша корзина</span>
				{basket.length > 0 && (
					<span className="text-2xl font-bold text-success">
						{totalBasketPrice} BYN
					</span>
				)}
			</div>
			{basket.length > 0 ? (
				<div className="flex overflow-auto gap-3 items-center">
					{getCountedBasket(basket).map(({ phone, count }) => (
						<div key={phone.id} className="flex flex-col gap-2 shrink-0">
							<img
								className="object-cover h-64 rounded-lg aspect-square"
								src={phone.imageLink}
							/>
							<span className="font-bold">
								{phone.manufacturer} - {phone.model}
							</span>
							<Link
								href={`/items/${phone.id}`}
								className="btn btn-sm md:btn-md"
							>
								Подробнее
							</Link>
							<button
								onClick={() => {
									dispatch(removeItemFromBasket(phone));
								}}
								className="btn btn-warning btn-sm md:btn-md"
							>
								Удалить из корзины
							</button>
							<span className="font-bold text-success">
								Стоимость: {phone.priceBYN / 100} * {count}
							</span>
						</div>
					))}
				</div>
			) : (
				<span className="text-3xl font-bold text-neutral-500">
					В корзине ничего нет
				</span>
			)}
			{basket.length > 0 && (
				<button className="btn btn-success">Оформить заказ</button>
			)}
		</div>
	);
}
