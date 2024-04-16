import Link from "next/link";

export default function ProfileLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-5 w-full h-full md:flex-row">
			<ul className="md:w-56 menu menu-horizontal bg-base-200 rounded-box md:menu-vertical">
				<li>
					<Link href={"/profile/info"}>Аккаунт</Link>
				</li>
				<li>
					<Link href={"/profile/basket"}>Корзина</Link>
				</li>
			</ul>
			<div className="overflow-auto w-full h-full">{children}</div>
		</div>
	);
}
