import prisma from "@/prisma/client";
import Profile from "./profile";
import getUser from "../api/getUser";
import { Order, Phone } from "@prisma/client";

export default async function ProfilePage() {
	const user = await getUser();
	let orders = [] as (Order & { items: Phone[] })[];
	if (user)
		orders = await prisma.order.findMany({
			where: { customerId: user.id },
			include: { items: true },
		});
	console.log(orders);
	return (
		<div className="flex flex-col gap-3">
			<Profile />
			{orders.length > 0 && user && (
				<div className="flex flex-col gap-3 p-3 bg-base-100">
					<span className="text-xl font-bold text-neutral-500">
						Ваши заказы
					</span>
					<div className="flex flex-col gap-2">
						{orders.map((o) => (
							<div className="flex p-3 bg-base-200" key={o.id}>
								<span className="flex gap-3 items-center">
									<span className="text-lg font-bold">#{o.id}</span>
									<span className="font-bold text-success">
										{o.totalPriceBYN / 100} BYN
									</span>
									<span className="text-neutral-400">
										от {o.created.toISOString().split("T")[0]}
									</span>
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
