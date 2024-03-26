import { IconDeviceMobile } from "@tabler/icons-react";

export default function Header() {
	return (
		<div className="flex items-center py-2 px-3 font-bold text-white">
			<IconDeviceMobile />
			<span className="uppercase">phone shop</span>
		</div>
	);
}
