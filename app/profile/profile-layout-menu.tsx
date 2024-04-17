"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayoutMenu() {
	const path = usePathname();

	return (
		<ul className="gap-2 justify-center md:justify-start md:w-56 menu menu-horizontal bg-base-200 rounded-box md:menu-vertical">
			<li className="flex-1 md:flex-none">
				<Link
					className={`justify-center md:justify-start ${
						path === "/profile/info" ? "active" : ""
					}`}
					href={"/profile/info"}
				>
					Аккаунт
				</Link>
			</li>
			<li className="flex-1 md:flex-none">
				<Link
					className={`justify-center md:justify-start ${
						path === "/profile/basket" ? "active" : ""
					}`}
					href={"/profile/basket"}
				>
					Корзина
				</Link>
			</li>
		</ul>
	);
}
