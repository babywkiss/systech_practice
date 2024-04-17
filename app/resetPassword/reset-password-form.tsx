"use client";

import { IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function ResetPasswordForm() {
	const router = useRouter();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const modal = useRef<HTMLDialogElement>(null);

	const handleSubmit = async (e: FormEvent) => {
		setLoading(true);
		e.preventDefault();
		const res = await fetch("/api/users/resetPassword", {
			method: "POST",
			body: new FormData(e.target as HTMLFormElement),
		});
		if (res.ok) {
			modal?.current?.showModal();
		} else {
			setError((await res.json()).error.message);
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 items-center w-full"
		>
			<span className="text-3xl font-bold">Восстановить пароль</span>
			<label className="flex gap-2 items-center w-full input md:w-fit">
				<IconMail />
				<input name="email" type="email" placeholder="Электронная почта" />
			</label>
			<span className="w-72">
				Введите ваш email, мы отправим вам письмо на почту
			</span>
			{loading ? (
				<span className="loading loading-spinner loading-md"></span>
			) : (
				<button type="submit" className="w-4/5 btn btn-primary md:w-fit">
					Продолжить
				</button>
			)}
			<span className="text-sm text-error">{error}</span>

			<dialog ref={modal} className="modal">
				<div className="modal-box">
					<h3 className={`text-lg font-bold text-success`}>
						Письмо для восстановления пароля отправлено на почту, действительно
						в течении 10 минут.
					</h3>
					<div className="modal-action">
						<form method="dialog">
							<button
								onClick={() => {
									router.replace("/");
									router.refresh();
								}}
								className="btn"
							>
								Продолжить
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</form>
	);
}
