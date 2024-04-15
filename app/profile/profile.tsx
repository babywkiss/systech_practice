"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeItemFromBasket } from "../store/basketSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconBasket } from "@tabler/icons-react";

export default function Profile() {
	const user = useSelector((state: RootState) => state.user);
	const basket = useSelector((state: RootState) => state.basket.data);
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = async () => {
		await fetch("/api/users/logout");
		router.replace("/");
		router.refresh();
	};

	const totalBasketPrice =
		basket.reduce(
			(total, { phone, count }) => total + phone.priceBYN * count,
			0,
		) / 100;

	return (
		<div className="flex flex-col gap-5 w-full">
			{user ? (
				<div className="flex flex-col gap-3 justify-between p-3 rounded-lg md:flex-row md:items-center bg-base-100">
					<div className="flex flex-col gap-3">
						<span className="text-2xl font-bold">{user.email}</span>
						<div className="badge badge-neutral badge-lg">
							Аккаунт создан: {user?.created.toISOString().split("T")[0]}
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
			<div className="flex gap-2 items-center text-neutral-500">
				<IconBasket className="" size="40" />
				<span className="text-xl font-bold md:text-2xl">Ваша корзина</span>
				{basket.length > 0 && (
					<Link
						href="/pay"
						type="submit"
						role="link"
						className="ml-3 btn btn-success"
					>
						Оформить заказ
						<div className="badge badge-neutral">{totalBasketPrice} BYN</div>
					</Link>
				)}
			</div>
			{basket.length > 0 ? (
				<div className="flex overflow-auto gap-3 items-center">
					{basket.map(({ phone, count }) => (
						<div key={phone.id} className="flex flex-col gap-2 shrink-0">
							<img
								className="object-cover h-48 rounded-lg aspect-square"
								src={phone.imageLink}
							/>
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
								className="btn btn-warning btn-sm"
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
