"use client";

import { FormEvent, useState } from "react";

export default function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

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
		}
		console.log(await response.json());
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
