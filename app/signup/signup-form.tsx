"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CredentialsForm from "../_components/credentials-form";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const isPassword = (str: string) => PASSWORD_REGEX.test(str) && str.length < 50;

export default function SignupForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<CredentialsForm
			loading={loading}
			onSubmit={async (credentials, setError) => {
				const isPasswordValid = isPassword(credentials.password);
				if (!isPasswordValid) {
					setError(
						"Пароль должен содержать минимум 1 цифру, 1 символ (нижний и верхний регистр), минимум 8 латинских символов.",
					);
					return;
				}
				setLoading(true);
				const res = await fetch("/api/users", {
					method: "POST",
					body: JSON.stringify(credentials),
				});
				if (res.ok) {
					router.push("/profile/info");
					router.refresh();
				} else {
					setError((await res.json()).error.message);
					setLoading(false);
				}
			}}
		/>
	);
}
