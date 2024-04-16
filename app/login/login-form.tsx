"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CredentialsForm from "../_components/credentials-form";

export default function LoginForm() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<CredentialsForm
			loading={loading}
			onSubmit={async (credentials, setError) => {
				setLoading(true);
				const res = await fetch("/api/users/login", {
					method: "POST",
					body: JSON.stringify(credentials),
				});
				if (res.ok) {
					router.push("/profile/info");
					router.refresh();
				} else {
					setError((await res.json()).error.message);
				}
				setLoading(false);
			}}
		/>
	);
}
