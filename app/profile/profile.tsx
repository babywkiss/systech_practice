"use client";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { RootState } from "../store/store";

export default function Profile() {
	const user = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.removeItem("authToken");
		dispatch(logoutUser());
	};
	return user.user ? (
		<div className="flex flex-col">
			<span className="text-xl font-bold">{user.user.email}</span>
			<span className="text-xl">
				Аккаунт создан: {user.user.created.toString()}
			</span>
			<button onClick={logout} className="bg-red-500 btn btn-filled w-fit">
				Выйти из аккаунта
			</button>
		</div>
	) : (
		<h1>Вы не вошли в аккаунт</h1>
	);
}
