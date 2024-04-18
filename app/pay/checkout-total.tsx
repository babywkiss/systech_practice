"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function CheckoutTotal() {
	const basket = useSelector((state: RootState) => state.basket.data);

	const totalBasketPrice =
		basket.reduce(
			(total, { phone, count }) => total + phone.priceBYN * count,
			0,
		) / 100;
	return (
		<div className="flex overflow-auto flex-col gap-3 items-center p-3 w-full h-full rounded-lg bg-base-100 md:h-fit md:w-fit">
			<table className="table">
				<thead>
					<tr>
						<th>Товар</th>
						<th>Стоимость</th>
						<th>Количество</th>
					</tr>
				</thead>
				<tbody>
					{basket.map(({ phone, count }) => (
						<tr key={phone.id}>
							<td>
								{phone.manufacturer} {phone.model}
							</td>
							<td>{phone.priceBYN / 100} BYN</td>
							<td>X {count}</td>
						</tr>
					))}
				</tbody>
			</table>
			<span className="font-bold text-success">
				Всего: {totalBasketPrice} BYN
			</span>
		</div>
	);
}
