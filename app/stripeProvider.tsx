"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCountedBasket } from "./profile/profile";
import { RootState } from "./store/store";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function StripeProvider(props: { children: React.ReactNode }) {
	const [clientSecret, setClientSecret] = useState("");
	const [error, setError] = useState("");

	const basket = useSelector((state: RootState) => state.basket.data);
	const countedBasket = getCountedBasket(basket);

	useEffect(() => {
		fetch("/api/pay", { method: "POST", body: JSON.stringify(countedBasket) })
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setError(data.error);
					return;
				}
				setClientSecret(data?.client_secret);
			});
	}, []);

	if (error) return <span className="text-xl text-error">{error}</span>;
	if (!clientSecret) return <span>Загрузка ...</span>;

	return (
		<Elements
			options={{ locale: "ru", clientSecret }}
			stripe={loadStripe(stripeKey ?? "")}
		>
			{props.children}
		</Elements>
	);
}
