import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import basketReducer from "./basketSlice";
import { useDispatch, useSelector } from "react-redux";

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

const basketPersistReducer = persistReducer(
	{ key: "basket", storage },
	basketReducer,
);

export const store = configureStore({
	reducer: {
		basket: basketPersistReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
