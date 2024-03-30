import { Phone, User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
	user: User | null;
	basket: Phone[];
};

const initialState: UserState = {
	user: null,
	basket: [],
};

export const userSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		loginUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
			state.basket = [];
		},
		addItemToBasket: (state, action: PayloadAction<Phone>) => {
			state.basket = [...state.basket, action.payload];
		},
	},
});

export const { loginUser, logoutUser, addItemToBasket } = userSlice.actions;
export default userSlice.reducer;
