"use client";

import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { IconCheck, IconExclamationMark } from "@tabler/icons-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

export default function PayWidget() {
	const stripe = useStripe();
	const elements = useElements();
	const modalRef = useRef<HTMLDialogElement>(null);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		if (!stripe || !elements) return;
		e.preventDefault();
		const { error } = await stripe?.confirmPayment({
			elements,
			confirmParams: {
				return_url: "https://localhost:3000",
			},
			redirect: "if_required",
		});
		if (error) setError(error.message ?? "");
		modalRef.current?.showModal();
	};

	return (
		<form
			id="payment-form"
			className="flex flex-col gap-3 items-center w-full md:w-1/2"
			onSubmit={handleSubmit}
		>
			<PaymentElement id="payment-element" />
			<button className="btn btn-success">Оплатить</button>
			<dialog ref={modalRef} id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold"></h3>
					<p className="py-4">
						{error ? (
							<span className="font-bold text-error">
								<IconExclamationMark />
								{`Произошла ошибка: ${error}`}
							</span>
						) : (
							<span className="font-bold text-success">
								<IconCheck />
								Оплата прошла успешно
							</span>
						)}
					</p>
					<div className="modal-action">
						<form method="dialog">
							<Link href="/profile">
								<button className="btn">Продолжить</button>
							</Link>
						</form>
					</div>
				</div>
			</dialog>
		</form>
	);
}
