"use client";

import { User } from "@prisma/client";
import { IconKey } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const isPassword = (str: string) => PASSWORD_REGEX.test(str) && str.length < 50;

export default function ConfirmResetForm({
	token,
	user,
}: { token: string; user: User }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);

		const newPassword = data.get("password")?.toString() ?? "";
		const isPasswordValid = isPassword(newPassword);
		if (!isPasswordValid) {
			setError(
				"Пароль должен содержать минимум 1 цифру, 1 символ (нижний и верхний регистр), минимум 8 латинских символов.",
			);
			return;
		}

		setLoading(true);

		const res = await fetch("/api/users/resetPassword", {
			method: "PATCH",
			body: JSON.stringify({
				token,
				newPassword,
			}),
		});

		if (res.ok) {
			router.push("/profile/info");
			router.refresh();
		} else {
			setError((await res.json()).error.message);
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 justify-center items-center w-full h-full"
		>
			Восстановление пароля для <span className="font-bold">{user.email}</span>
			<label className="flex gap-2 items-center w-4/5 input md:w-fit">
				<IconKey />
				<input
					minLength={7}
					name="password"
					type="password"
					placeholder="Новый пароль"
				/>
			</label>
			{loading ? (
				<span className="loading loading-spinner loading-lg"></span>
			) : (
				<button type="submit" className="btn btn-primary">
					Авторизоваться{" "}
				</button>
			)}
			<span className="text-sm text-error">{error}</span>
		</form>
	);
}
