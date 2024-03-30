"use client";

import { loginUser } from "@/app/store/userSlice";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/signup", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
		});
		if (response.status !== 200) {
			setError((await response.json()).error);
			return;
		} else {
			// TODO: move this login in separate file for reusability
			const token = (await response.json()).token;
			localStorage.setItem("authToken", token);
			fetch("/api/me", {
				headers: { token: localStorage.getItem("authToken") ?? "" },
			})
				.then((res) => res.json())
				.then((user) => {
					if (!user.error) dispatch(loginUser(user));
				});
			router.push("/profile");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
			<input
				type="email"
				onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
				value={email}
				placeholder="Электронная почта"
				className="input"
			/>
			<input
				type="password"
				onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
				value={password}
				placeholder="Пароль"
				className="input"
			/>
			<button type="submit" className="btn btn-filled">
				Создать
			</button>
			<span className="text-sm text-red-500">{error}</span>
		</form>
	);
}
