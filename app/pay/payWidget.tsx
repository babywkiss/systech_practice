"use client";

import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { IconCheck, IconExclamationMark } from "@tabler/icons-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { resetBasket } from "../store/basketSlice";

export default function PayWidget() {
	const stripe = useStripe();
	const elements = useElements();
	const modalRef = useRef<HTMLDialogElement>(null);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (e: FormEvent) => {
		if (!stripe || !elements) return;
		e.preventDefault();
		const { error, paymentIntent } = await stripe?.confirmPayment({
			elements,
			confirmParams: {},
			redirect: "if_required",
		});
		if (error) {
			setError(error.message ?? "");
		} else {
			const resp = await fetch("/api/orders", {
				method: "POST",
				body: JSON.stringify({
					paymentId: paymentIntent.id,
				}),
			});
			console.log(resp);
		}
		dispatch(resetBasket());
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
