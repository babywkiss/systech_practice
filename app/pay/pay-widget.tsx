"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { resetBasket } from "../store/basket-slice";

export default function PayWidget() {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();

	const dispatch = useDispatch();
	const basket = useSelector((state: RootState) => state.basket.data);

	const modal = useRef<HTMLDialogElement>(null);

	const [error, setError] = useState("");
	const [hint, setHint] = useState("");
	const [loading, setLoading] = useState(false);

	const handleServerResponse = async (res: any) => {
		if (res.error) {
			setError("Произошла ошибка");
			modal.current?.showModal();
			return;
		}
		if (res.requires_action && stripe) {
			const { error: errorAction, paymentIntent } =
				await stripe.handleCardAction(res.payment_intent_client_secret);
			if (errorAction) {
				setError("Произошла ошибка");
				modal.current?.showModal();
				return;
			}
			const serverResponse = await fetch("/api/orders", {
				method: "POST",
				body: JSON.stringify({
					payment_intent_id: paymentIntent.id,
					basket,
				}),
			});
			await handleServerResponse(await serverResponse.json());
		} else {
			setError("");
			dispatch(resetBasket());
			modal?.current?.showModal();
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		setLoading(true);
		e.preventDefault();
		if (!stripe || !elements) return;
		const card = elements.getElement(CardElement);
		if (!card) return;

		const result = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (result.error) {
			setHint(result.error?.message ?? "");
			setLoading(false);
		} else {
			const response = await fetch("/api/orders", {
				method: "POST",
				body: JSON.stringify({
					payment_method_id: result.paymentMethod.id,
					basket,
				}),
			});
			const paymentResponse = await response.json();
			await handleServerResponse(paymentResponse);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-8 p-3 w-full rounded-lg md:w-96 bg-base-100"
		>
			<label className="flex flex-col gap-8">
				Введите данные для оплаты
				<div className="p-3 rounded-lg bg-base-200">
					<CardElement
						options={{
							style: {
								base: {
									// HACK: extract styles from main document to iframe
									color: getComputedStyle(document.body).getPropertyValue(
										"color",
									),
								},
							},
						}}
					/>
				</div>
				<span className="text-sm text-error">{hint}</span>
			</label>
			{loading ? (
				<div className="flex justify-center items-center w-full">
					<span className="loading loading-spinner loading-md"></span>
				</div>
			) : (
				<button className="btn btn-success">Оплатить</button>
			)}
			<dialog ref={modal} className="modal">
				<div className="modal-box">
					<h3
						className={`text-lg font-bold ${
							error ? "text-error" : "text-success"
						}`}
					>
						{error || "Оплата прошла успешно"}
					</h3>
					<div className="modal-action">
						<form method="dialog">
							<button
								onClick={() => {
									router.replace("/profile/info");
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
