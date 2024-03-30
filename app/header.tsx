"use client";

import SidePanel from "@/components/side-panel";
import { IconMenu, IconDeviceMobile, IconBasket } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { loginUser } from "./store/userSlice";

const ProfileInfo = () => {
	const user = useSelector((state: RootState) => state.user);
	const basketItemsCount = useSelector(
		(state: RootState) => state.basket.length,
	);
	return user ? (
		<Link href="/profile" className="flex gap-3 items-center btn btn-outline">
			<span>{user.email}</span>
			<div className="flex gap-1">
				<IconBasket />
				<span>{basketItemsCount}</span>
			</div>
		</Link>
	) : (
		<button>Login</button>
	);
};

const NavMenu = () => {
	const links = [
		{ name: "Каталог", href: "/catalog" },
		{ name: "Мой аккаунт", href: "/profile" },
	];
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<button onClick={() => setIsOpen(true)} className="btn btn-filled">
				<IconMenu />
			</button>
			<SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ul className="flex flex-col gap-3 p-5 w-72">
					{links.map(({ name, href }) => (
						<Link
							onClick={() => setIsOpen(false)}
							className="text-blue-500 border-b-2 transition-transform hover:scale-110 border-b-blue-500"
							href={href}
						>
							{name}
						</Link>
					))}
				</ul>
			</SidePanel>
		</>
	);
};

export default function Header() {
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
				<ProfileInfo />
				<NavMenu />
			</div>
		</div>
	);
}
