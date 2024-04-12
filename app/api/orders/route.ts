import prisma from "@/prisma/client";
import getUser from "../getUser";
import stripe from "../pay/stripe";

export async function POST(req: Request) {
	const user = await getUser();
	if (!user) return Response.json({ error: "Not authorized" }, { status: 403 });

	try {
		const { paymentId } = await req.json();
		const paymentIntent = await stripe.paymentIntents.retrieve(paymentId ?? "");
		console.log(paymentIntent);
		if (!paymentIntent)
			return Response.json({ error: "Invalid req" }, { status: 403 });
		if (paymentIntent.status === "succeeded") {
			const basket = JSON.parse(paymentIntent.metadata.basket) as {
				count: number;
				id: number;
			}[];
			const includedPhones = basket.reduce((acc, { count, id }) => {
				for (let i = 0; i < count; i++) {
					acc.push(id);
				}
				return acc;
			}, [] as number[]);
			await prisma.order.create({
				data: {
					totalPriceBYN: paymentIntent.amount,
					customerId: user.id,
					items: { connect: includedPhones.map((id) => ({ id })) },
				},
			});
			return Response.json({ success: true });
		}
	} catch {
		return Response.json({ error: "Invalid req" }, { status: 403 });
	}
}
