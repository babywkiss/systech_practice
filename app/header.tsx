import SidePanel from "@/components/side-panel";
import { IconMenu, IconDeviceMobile } from "@tabler/icons-react";

export default function Header() {
	return (
		<div className="flex justify-between items-center py-2 px-3 font-bold text-white">
			<div className="flex gap-2 items-center">
				<IconDeviceMobile />
				<span className="uppercase">phone shop</span>
			</div>
			<div className="flex gap-2 items-center">
				<button className="btn btn-outline">Логин</button>
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
