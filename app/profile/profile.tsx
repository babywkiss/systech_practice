"use client";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
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
			<ul>
				{basket.map((item) => (
					<li>
						{item.manufacturer} - {item.model}
					</li>
				))}
			</ul>
		</div>
	) : (
		<h1>Вы не вошли в аккаунт</h1>
	);
}
