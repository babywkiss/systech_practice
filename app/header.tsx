import SidePanel from "@/components/side-panel";
import { IconMenu, IconDeviceMobile } from "@tabler/icons-react";
import Link from "next/link";

export default function Header() {
	return (
		<div className="flex justify-between items-center py-2 px-3 font-bold text-white">
			<a href="/" className="flex gap-2 items-center btn">
				<IconDeviceMobile />
				<span className="uppercase">phone shop</span>
			</a>
			<div className="flex gap-2 items-center">
				<Link href="/auth/login" className="btn btn-outline">
					Логин
				</Link>
				<SidePanel
					trigger={
						<div className="btn btn-filled">
							<IconMenu />
						</div>
					}
				>
					<span className="text-3xl font-bold">Бургер-меню</span>
				</SidePanel>
			</div>
		</div>
	);
}
