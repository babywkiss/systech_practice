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
			<div className="flex-1">
				<Logo />
			</div>
			{user?.isSuperAdmin && (
				<div className="flex-none">
					<Link className="btn btn-warning" href="/admin">
						<IconUser />
						Пользователи
					</Link>
				</div>
			)}
			<div className="flex-none">
				<Link
					className="invisible md:visible btn btn-primary"
					href={user ? "/profile/info" : "/login"}
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
				<BasketLink />
			</div>
			<div className="flex-none">
				<NavDrawer />
			</div>
		</div>
	);
}
