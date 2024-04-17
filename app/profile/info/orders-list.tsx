import { Order, Phone, User } from "@prisma/client";
import { IconCheck, IconClock } from "@tabler/icons-react";

export default async function OrdersList({
	user,
	orders,
}: {
	user: User;
	orders: (Order & { items: Phone[] })[];
}) {
	if (orders.length < 1)
		return (
			<span className="text-3xl font-bold text-neutral-500">
				Здесь будут ваши заказы
			</span>
		);
	return (
		<div className="flex overflow-auto flex-col gap-3 w-full h-full rounded-lg">
			{orders.length > 0 && user && (
				<div className="flex overflow-auto flex-col gap-3 p-3 w-full h-full bg-base-100">
					<table className="table overflow-auto w-full">
						<thead>
							<tr>
								<th>ID</th>
								<th>Сумма</th>
								<th>Товары</th>
								<th>Дата</th>
								<th>Статус</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((o) => (
								<tr key={o.id}>
									<td>
										<span className="text-lg font-bold">#{o.id}</span>
									</td>
									<td>
										<span className="font-bold text-success">
											{o.totalPriceBYN / 100} BYN
										</span>
									</td>
									<td>
										<span>{o.items.length} шт.</span>
									</td>
									<td>{o.created.toISOString().split("T")[0]}</td>
									<td>
										<div
											className={`gap-2 badge ${
												o.completed ? "text-success" : ""
											}`}
										>
											<span>{o.completed ? "Выполнен" : "В процессе"}</span>
											{o.completed ? <IconCheck /> : <IconClock />}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
