"use client";

import { User } from "@prisma/client";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";

export default function AuthProvier({
	children,
	user,
}: { children: React.ReactNode; user: User | null }) {
	const dispatch = useDispatch();
	dispatch(setUser(user));
	return <>{children}</>;
}
