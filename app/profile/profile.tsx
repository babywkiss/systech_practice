"use client";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, removeItemFromBasket } from "../store/userSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";

export default function Profile() {
	const user = useSelector((state: RootState) => state.user);
	const basket = useSelector((state: RootState) => state.basket);
	const router = useRouter();
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.removeItem("authToken");
		dispatch(logoutUser());
		router.replace("/");
	};
	return user ? (
		<div className="flex flex-col">
			<span className="text-xl font-bold">{user.email}</span>
			<span className="text-xl">Аккаунт создан: {user.created.toString()}</span>
			<button onClick={logout} className="bg-red-500 btn btn-filled w-fit">
				Выйти из аккаунта
			</button>
			<span className="text-xl font-bold">Ваша корзина</span>
			<ul className="flex gap-2">
				{basket.map((item) => (
					<div
						key={item.id}
						className="flex flex-col items-center p-3 bg-blue-200 rounded-lg"
					>
						<img className="h-32" src={item.imageLink} />
						<span>
							{item.manufacturer} - {item.model}
						</span>
						<button
							onClick={() => {
								dispatch(removeItemFromBasket(item));
							}}
							className="bg-orange-500 btn btn-filled"
						>
							Удалить из корзины
						</button>
					</div>
				))}
			</ul>
		</div>
	) : (
		<h1>Вы не вошли в аккаунт</h1>
	);
}
