"use client";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, removeItemFromBasket } from "../store/userSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { Phone } from "@prisma/client";
import Link from "next/link";

// TODO: simplify logic (use library)

const getUniquePhones = (phones: Phone[]) => {
	const unique: Phone[] = [];
	const viewedIds = new Set<number>();
	for (const phone of phones) {
		if (!viewedIds.has(phone.id)) {
			unique.push(phone);
			viewedIds.add(phone.id);
		}
	}
	return unique;
};

const getCountedBasket = (phones: Phone[]) => {
	const unique = getUniquePhones(phones).map((phone) => ({ phone, count: 0 }));
	for (const phone of phones) {
		const target = unique.find((p) => p.phone.id === phone.id);
		if (target) target.count += 1;
	}
	return unique;
};

export default function Profile() {
	// TODO: add pay page
	const user = useSelector((state: RootState) => state.user);
	const basket = useSelector((state: RootState) => state.basket);
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.removeItem("authToken");
		dispatch(logoutUser());
		router.replace("/");
	};
	return (
		<div className="flex flex-col">
			{user ? (
				<>
					<span className="text-xl font-bold">{user.email}</span>
					<span className="text-xl">
						Аккаунт создан: {user.created.toString().split("T")[0]}
					</span>
					<button onClick={logout} className="bg-red-500 btn btn-filled w-fit">
						Выйти из аккаунта
					</button>
				</>
			) : (
				<span>Вы не вошли в аккаунт</span>
			)}
			<span className="text-xl font-bold">Ваша корзина</span>
			{basket.length > 0 ? (
				<>
					<button className="bg-green-500 btn btn-filled md:w-fit">
						Оформить заказ
					</button>
					<span className="text-xl font-bold">
						Общая стоимость:{" "}
						{basket.reduce((total, phone) => total + phone.priceBYN, 0) / 100}{" "}
						BYN
					</span>
					<ul className="flex gap-2">
						{getCountedBasket(basket).map(({ phone, count }) => (
							<div
								key={phone.id}
								className="flex flex-col items-center p-3 bg-blue-200 rounded-lg"
							>
								<img className="h-32" src={phone.imageLink} />
								<span>
									{phone.manufacturer} - {phone.model}
								</span>
								<Link
									href={`/items/${phone.id}`}
									className="bg-gray-400 btn btn-filled"
								>
									Подробнее
								</Link>
								<button
									onClick={() => {
										dispatch(removeItemFromBasket(phone));
									}}
									className="bg-orange-500 btn btn-filled"
								>
									Удалить из корзины
								</button>
								<span className="font-bold">Штук: {count}</span>
								<span className="font-bold">
									Стоимость: {phone.priceBYN / 100} * {count}
								</span>
							</div>
						))}
					</ul>
				</>
			) : (
				<span>В корзине ничего нет</span>
			)}
		</div>
	);
}
