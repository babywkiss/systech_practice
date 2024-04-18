import { Phone } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
	name: "basket",
	initialState: { data: [] } as { data: { phone: Phone; count: number }[] },
	reducers: {
		resetBasket: (state) => {
			state.data = [];
		},
		addItemToBasket: (state, action: PayloadAction<Phone>) => {
			const foundIndex = state.data.findIndex(
				({ phone }) => phone.id === action.payload.id,
			);
			if (foundIndex === -1) {
				state.data.push({ phone: action.payload, count: 1 });
			} else {
				state.data[foundIndex].count += 1;
			}
		},
		removeItemFromBasket: (state, action: PayloadAction<Phone>) => {
			const indexToRemove = state.data.findIndex(
				({ phone }) => phone.id === action.payload.id,
			);
			if (indexToRemove !== -1) {
				const { count } = state.data[indexToRemove];
				if (count <= 1) {
					state.data.splice(indexToRemove, 1);
				} else {
					state.data[indexToRemove].count -= 1;
				}
			}
		},
	},
});

export const { addItemToBasket, removeItemFromBasket, resetBasket } =
	basketSlice.actions;
export default basketSlice.reducer;
