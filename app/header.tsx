"use client";

import {
	IconMenu,
	IconDeviceMobile,
	IconBasket,
	IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

const LINKS = [
	{ name: "Каталог", href: "/catalog" },
	{ name: "Мой аккаунт", href: "/profile" },
];

export default function Header() {
	const user = useSelector((state: RootState) => state.user);
	const basket = useSelector((state: RootState) => state.basket.data);
	const drawerToggleRef = useRef<HTMLInputElement>(null);

	return (
		<div className="gap-1 navbar bg-base-100">
			<div className="flex-1">
				<Link className="btn btn-ghost" href="/">
					<IconDeviceMobile />
					PHONE-SHOP
				</Link>
			</div>
			<div className="flex-none">
				<Link
					className="invisible md:visible btn btn-primary"
					href={user ? "/profile" : "/auth/login"}
				>
					{user ? (
						<>
							<IconUser />
							{user.email}
						</>
					) : (
						"Войти в аккаунт"
					)}
				</Link>
			</div>
			<div className="flex-none">
				<Link className="btn btn-ghost" href="/profile">
					<IconBasket />
					<div className="badge badge-secondary">{basket.length}</div>
				</Link>
			</div>
			<div className="flex-none">
				<div className="drawer drawer-end">
					<input
						ref={drawerToggleRef}
						id="main-drawer"
						type="checkbox"
						className="drawer-toggle"
					/>
					<div className="drawer-content">
						<label
							htmlFor="main-drawer"
							className="drawer-button btn btn-square btn-ghost"
						>
							<IconMenu />
						</label>
					</div>
					<div className="z-10 drawer-side">
						<label
							htmlFor="main-drawer"
							aria-label="close sidebar"
							className="drawer-overlay"
						/>
						<ul className="p-4 w-80 min-h-full menu bg-base-200 text-base-content">
							{LINKS.map(({ href, name }) => (
								<li onClick={() => drawerToggleRef.current?.click()} key={href}>
									<Link href={href}>{name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
