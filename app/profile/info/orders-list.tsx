import { extractUser } from "@/app/api/auth";
import prisma from "@/prisma/client";
import { Order, Phone } from "@prisma/client";
import { IconCheck, IconClock } from "@tabler/icons-react";

export default async function OrdersList() {
	const user = await extractUser();
	let orders = [] as (Order & { items: Phone[] })[];
	if (user)
		orders = await prisma.order.findMany({
			where: { customerId: user.id },
			include: { items: true },
		});

	return (
		<div className="flex overflow-auto flex-col gap-3 w-full h-full rounded-lg">
			{orders.length > 0 && user && (
				<div className="flex overflow-auto flex-col gap-3 p-3 w-full h-full bg-base-100">
					<div className="flex overflow-auto flex-col gap-2 w-full h-full">
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
									<div className="gap-2 badge">
										<span>Статус</span>
										{o.completed ? <IconCheck /> : <IconClock />}
									</div>
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
