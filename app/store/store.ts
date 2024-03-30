import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: number) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();

const userPersistReducer = persistReducer(
	{ key: "user", storage },
	userReducer,
);

export const store = configureStore({
	reducer: userPersistReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
