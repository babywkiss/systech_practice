import { Phone } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
	name: "basket",
	initialState: { data: [] } as { data: Phone[] },
	reducers: {
		addItemToBasket: (state, action: PayloadAction<Phone>) => {
			state.data.push(action.payload);
		},
		removeItemFromBasket: (state, action: PayloadAction<Phone>) => {
			const indexToRemove = state.data.findIndex(
				(ph) => ph.id === action.payload.id,
			);
			if (indexToRemove !== -1) state.data.splice(indexToRemove, 1);
		},
	},
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
