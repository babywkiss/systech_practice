"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function StripeProvider(props: { children: React.ReactNode }) {
	return (
		<Elements options={{ locale: "ru" }} stripe={loadStripe(stripeKey ?? "")}>
			{props.children}
		</Elements>
	);
}
