import { IconKey, IconMail } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

export default function CredentialsForm({
	children,
	loading = false,
	onSubmit,
}: {
	children?: React.ReactNode;
	loading?: boolean;
	onSubmit: (
		credentials: { email: string; password: string },
		setError: (err: string) => void,
	) => void;
}) {
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);

		onSubmit(
			Object.fromEntries(data) as { email: string; password: string },
			setError,
		);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={`flex flex-col gap-3 items-center w-full ${
					loading ? "hidden" : ""
				}`}
			>
				<label className="flex gap-2 items-center w-4/5 input md:w-fit">
					<IconMail />
					<input name="email" type="email" placeholder="Электронная почта" />
				</label>
				<label className="flex gap-2 items-center w-4/5 input md:w-fit">
					<IconKey />
					<input name="password" type="password" placeholder="Пароль" />
				</label>
				{children ?? (
					<button type="submit" className="w-4/5 btn btn-primary md:w-fit">
						Продолжить
					</button>
				)}
				<span className="text-sm text-error">{error}</span>
			</form>
			{loading && <span className="loading loading-spinner loading-lg"></span>}
		</>
	);
}
