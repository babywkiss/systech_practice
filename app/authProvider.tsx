"use client";

import { User } from "@prisma/client";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { useEffect } from "react";

export default function AuthProvider({
	children,
	user,
}: { children: React.ReactNode; user: User | null }) {
	useEffect(() => {
		dispatch(setUser(user));
	}, []);
	const dispatch = useDispatch();
	return <>{children}</>;
}
