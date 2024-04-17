import stripe from "./stripe";
import prisma from "@/prisma/client";
import { extractUser } from "../auth";
import { errorResponse, tryOrNull } from "../utils";
import { Basket, validateBasket } from "../basket";
import { User } from "@prisma/client";

type RequestData = {
	basket?: any;
	payment_method_id?: string;
	payment_intent_id?: string;
};

const createIntent = async (reqData: RequestData, totalPrice: number) => {
	if (reqData?.payment_method_id) {
		return await stripe.paymentIntents.create({
			payment_method_types: ["card"],
			payment_method: reqData.payment_method_id,
			amount: totalPrice as number,
			currency: "byn",
			confirm: true,
			confirmation_method: "manual",
		});
	}

	if (reqData?.payment_intent_id) {
		return await stripe.paymentIntents.confirm(reqData.payment_intent_id);
	}

	return null;
};

const placeOrder = async (basket: Basket, totalPrice: number, user: User) => {
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
};

export async function POST(request: Request) {
	const user = await extractUser();
	if (!user) return Response.json({ error: "Not authorized" }, { status: 500 });

	const data = (await tryOrNull(request.json())) ?? {};

	const { error, totalPrice } = await validateBasket(data?.basket);
	if (error) return errorResponse(error, 400);

	const intent = await createIntent(data, totalPrice as number);

	switch (intent?.status) {
		case "succeeded":
			await placeOrder(data.basket, totalPrice as number, user);
			return Response.json({ success: true });
		case "requires_action":
			if (intent.next_action?.type === "use_stripe_sdk")
				return Response.json({
					requires_action: true,
					payment_intent_client_secret: intent.client_secret,
				});
		default:
			return errorResponse("Unknown error", 500);
	}
}
