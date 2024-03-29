"use client";

import SidePanel from "@/components/side-panel";
import { IconMenu, IconDeviceMobile } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { loginUser } from "./store/userSlice";

export default function Header() {
	const user = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/api/me", {
			headers: { token: localStorage.getItem("authToken") ?? "" },
		})
			.then((res) => res.json())
			.then((user) => {
				if (!user.error) dispatch(loginUser(user));
			});
	}, []);

	return (
		<div className="flex justify-between items-center py-2 px-3 font-bold text-white">
			<a href="/" className="flex gap-2 items-center btn">
				<IconDeviceMobile />
				<span className="uppercase">phone shop</span>
			</a>
			<div className="flex gap-2 items-center">
				{user.user ? (
					<span>
						Вы вошли как:
						<Link href="/profile">{user.user?.email}</Link>
					</span>
				) : (
					<Link href="/auth/login" className="btn btn-outline">
						Логин
					</Link>
				)}
				<SidePanel
					trigger={
						<div className="btn btn-filled">
							<IconMenu />
						</div>
					}
				>
					<div className="flex flex-col p-5">
						<Link className="text-blue-500 btn" href="/catalog">
							Каталог
						</Link>
					</div>
				</SidePanel>
			</div>
		</div>
	);
}
