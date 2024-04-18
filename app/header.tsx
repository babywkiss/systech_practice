import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import NavDrawer from "./_components/nav-drawer";
import BasketLink from "./_components/basket-link";
import { extractUser } from "./api/auth";
import Logo from "./_components/logo";

export default async function Header() {
	const user = await extractUser();

	return (
		<div className="gap-1 navbar bg-base-100">
			<div className="flex-1 md:flex-none">
				<Logo />
			</div>
			<div className="hidden flex-1 gap-5 justify-center items-center md:flex">
				{
					// 	<Link className="btn btn-ghost btn-sm" href="/catalog">
					// 		Каталог
					// 	</Link>
				}
			</div>
			{user?.isSuperAdmin && (
				<div className="flex-none">
					<Link className="hidden md:flex btn btn-warning" href="/admin">
						<IconUser />
						<span>Пользователи</span>
					</Link>
				</div>
			)}
			<div className="flex-none">
				<Link
					className="btn btn-ghost"
					href={user ? "/profile/info" : "/login"}
				>
					<IconUser />
					<span className="hidden md:block">
						{user?.email ?? "Войти в аккаунт"}
					</span>
				</Link>
			</div>
			<div className="flex-none">
				<BasketLink />
			</div>
			<div className="flex-none">
				<NavDrawer />
			</div>
		</div>
	);
}
