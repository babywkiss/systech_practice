"use client";

import { Phone } from "@prisma/client";
import {
	deleteFromBasket,
	setCountForItem,
	updateItem,
} from "./store/basket-slice";
import { store } from "./store/store";
import { useDispatch } from "react-redux";

export default function BasketProvider({
	children,
}: { children: React.ReactNode }) {
	const basket = store.getState().basket.data;
	const dispatch = useDispatch();

	for (const { phone, count } of basket) {
		fetch(`/api/phones/${phone.id}`)
			.then((res) => res.json())
			.then((actual: Phone | null) => {
				if (!actual) return dispatch(deleteFromBasket(phone));
				if (count > actual.available_quantity) {
					dispatch(
						setCountForItem({ phone, count: actual.available_quantity }),
					);
				}
				dispatch(updateItem({ oldPhone: phone, newPhone: actual }));
			});
	}

	return <>{children}</>;
}
