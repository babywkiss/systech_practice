import prisma from "@/prisma/client";
import { Phone } from "@prisma/client";

export type Basket = { count: number; phone: Phone }[];

export const validateBasket = async (
	basket: any,
): Promise<{ error?: string; totalPrice?: number }> => {
	let totalPrice = 0;

	if (!Array.isArray(basket) || basket.length <= 0)
		return { error: `Неверный формат корзины` };

	for (const item of basket) {
		const { phone, count } = item ?? {};

		if (typeof count !== "number" || count <= 0)
			return { error: `Неверный формат корзины` };
		if (typeof phone.id !== "number")
			return { error: `Неверный формат корзины` };

		const found = await prisma.phone.findUnique({ where: { id: phone?.id } });

		if (!found)
			return {
				error: `Телефон ${phone?.manufacturer} ${phone?.model} не существует.`,
			};

		if (found.available_quantity < count)
			return {
				error: `Телефон ${found.manufacturer} ${found.model} не доступен в количестве ${count}`,
			};

		totalPrice += found.priceBYN * count;
	}
	return { totalPrice };
};
