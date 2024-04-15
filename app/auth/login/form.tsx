"use client";

import { IconKey, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
		});
		if (!response.ok) {
			setError((await response.json()).error.message);
			return;
		}
		router.push("/profile");
		router.refresh();
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center w-full"
		>
			<label className="flex gap-2 items-center w-4/5 input md:w-fit">
				<IconMail />
				<input
					type="email"
					onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
					value={email}
					placeholder="Электронная почта"
				/>
			</label>
			<label className="flex gap-2 items-center w-4/5 input md:w-fit">
				<IconKey />
				<input
					type="password"
					onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
					value={password}
					placeholder="Пароль"
				/>
			</label>
			<button type="submit" className="w-4/5 btn btn-primary md:w-fit">
				Войти в аккаунт
			</button>
			<span className="text-sm text-error">{error}</span>
		</form>
	);
}
