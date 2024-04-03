"use client";

import { IconKey, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
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
			router.push("/profile");
			router.refresh();
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
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
					minLength={7}
					maxLength={32}
					onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
					value={password}
					placeholder="Пароль"
				/>
			</label>
			<button type="submit" className="w-4/5 btn btn-primary md:w-fit">
				Создать
			</button>
			<span className="text-sm text-error">{error}</span>
		</form>
	);
}
