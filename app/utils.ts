import { Phone } from "@prisma/client";

export const formatPrice = (priceCents: number) =>
	(priceCents / 100).toFixed(2);

export const calcBasketTotalPrice = (
	basket: { phone: Phone; count: number }[],
) =>
	basket.reduce((total, { phone, count }) => total + phone.priceBYN * count, 0);
