"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
		});
		if (response.status !== 200) {
			setError((await response.json()).error);
			return;
		}
		const token = (await response.json()).token;
		localStorage.setItem("authToken", token);
		router.push("/profile");
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
				Войти в аккаунт
			</button>
			<span className="text-sm text-red-500">{error}</span>
		</form>
	);
}
