import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: null as User | null,
	reducers: {
		setUser: (_, action: PayloadAction<User | null>) => {
			return action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
