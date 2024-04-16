import { Phone } from "@prisma/client";
import { useState } from "react";

export const formatPrice = (priceCents: number) =>
	(priceCents / 100).toFixed(2);

export const calcBasketTotalPrice = (
	basket: { phone: Phone; count: number }[],
) =>
	basket.reduce((total, { phone, count }) => total + phone.priceBYN * count, 0);

export const useSessionStorage = <T>(key: string, initial: T) => {
	const restoredValue: T =
		JSON.parse(sessionStorage.getItem(key) ?? "null") ?? initial;
	const [value, setValue] = useState(restoredValue);
	return [
		value,
		(value: T) => {
			sessionStorage.setItem(key, JSON.stringify(value));
			setValue(value);
		},
	] as const;
};
