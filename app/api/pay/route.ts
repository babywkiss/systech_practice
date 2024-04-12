import { Phone } from "@prisma/client";
import getUser from "../getUser";
import stripe from "./stripe";
import prisma from "@/prisma/client";

type Basket = { count: number; phone: Phone }[];

export async function POST(request: Request) {
	const user = await getUser();
	if (!user) return Response.json({ error: "Not authorized" }, { status: 500 });

	let totalPrice = 0;
	let basket = null as null | Basket;
	try {
		basket = (await request.json()) as Basket;
		// TODO: Validate basket schmea before iteration
		for (const { count, phone } of basket) {
			const found = await prisma.phone.findUnique({ where: { id: phone.id } });
			if (!found)
				return Response.json({ error: `Phone #${phone.id} not found.` });
			if (found.available_quantity < count)
				return Response.json({
					error: `Quantity of ${count} is not available for phone ${phone.id}`,
				});
			totalPrice += found.priceBYN * count;
		}
	} catch {
		return Response.json({ error: "Invalid basket" }, { status: 400 });
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalPrice,
		currency: "byn",
		automatic_payment_methods: {
			enabled: true,
		},
		metadata: {
			basket: JSON.stringify(
				basket.map((b) => ({ count: b.count, id: b.phone.id })),
			),
		},
	});
	return Response.json({ client_secret: paymentIntent.client_secret });
}
