"use client";

import { IconMenu, IconUser, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useRef } from "react";

const LINKS = [
	{ name: "Каталог", href: "/catalog" },
	{ name: "Мой аккаунт", href: "/profile/info" },
];

export default function NavDrawer() {
	const drawerToggleRef = useRef<HTMLInputElement>(null);

	return (
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
					<div className="flex p-2">
						<button
							className="btn btn-square btn-sm"
							onClick={() => drawerToggleRef.current?.click()}
						>
							<IconX />
						</button>
					</div>
					{LINKS.map(({ href, name }) => (
						<li onClick={() => drawerToggleRef.current?.click()} key={href}>
							<Link href={href}>{name}</Link>
						</li>
					))}
					<li className="flex flex-1 justify-end md:hidden">
						<Link
							onClick={() => drawerToggleRef.current?.click()}
							className="btn btn-warning"
							href="/admin"
						>
							<IconUser />
							<span>Пользователи</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
