import Link from "next/link";

export default function ProfileLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex gap-5 w-full h-full">
			<ul className="w-56 menu bg-base-200 rounded-box">
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
