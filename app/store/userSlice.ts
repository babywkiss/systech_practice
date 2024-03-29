import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
	user: User | null;
};

const initialState: UserState = {
	user: null,
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
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
