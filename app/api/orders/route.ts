import { Phone } from "@prisma/client";
import stripe from "./stripe";
import prisma from "@/prisma/client";
import { PaymentIntent } from "@stripe/stripe-js";
import { extractUser } from "../auth";

type Basket = { count: number; phone: Phone }[];

export async function POST(request: Request) {
	const user = await extractUser();
	if (!user) return Response.json({ error: "Not authorized" }, { status: 500 });

	let totalPrice = 0;
	let basket = null as null | Basket;
	let intent: PaymentIntent | null = null;

	try {
		const data = (await request.json()) as {
			basket: Basket;
			payment_method_id?: string;
			payment_intent_id?: string;
		};

		// TODO: Validate basket schmea before iteration
		basket = data.basket;
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

		if (data.payment_method_id) {
			intent = (await stripe.paymentIntents.create({
				payment_method_types: ["card"],
				payment_method: data.payment_method_id,
				amount: totalPrice,
				currency: "byn",
				confirm: true,
				confirmation_method: "manual",
			})) as PaymentIntent;
		} else if (data.payment_intent_id) {
			intent = (await stripe.paymentIntents.confirm(
				data.payment_intent_id,
			)) as PaymentIntent;
		}
		if (intent) {
			const response = generateResponse(intent);
			if (response.success) {
				// create order
				const flatBasket = basket.reduce((acc, { count, phone }) => {
					for (let i = 0; i < count; i++) {
						acc.push(phone.id);
					}
					return acc;
				}, [] as number[]);
				await prisma.order.create({
					data: {
						totalPriceBYN: totalPrice,
						customerId: user.id,
						items: {
							connect: flatBasket.map((id) => ({ id })),
						},
					},
				});
			}
			return Response.json(response);
		}
		return Response.json({ error: "no payment id" }, { status: 400 });
	} catch (e) {
		console.log(e);
		return Response.json(
			{ error: `failed to create payment` },
			{ status: 400 },
		);
	}
}

const generateResponse = (intent: PaymentIntent) => {
	if (
		intent.status === "requires_action" &&
		// @ts-ignore
		intent.next_action.type === "use_stripe_sdk"
	) {
		// Tell the client to handle the action
		return {
			requires_action: true,
			payment_intent_client_secret: intent.client_secret,
		};
	} else if (intent.status === "succeeded") {
		// The payment didn’t need any additional actions and completed!
		// Handle post-payment fulfillment
		return {
			success: true,
		};
	} else {
		// Invalid status
		return {
			error: "Invalid PaymentIntent status",
		};
	}
};
