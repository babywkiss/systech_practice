import { IconDeviceMobile } from "@tabler/icons-react";
import Link from "next/link";

export default function Logo() {
	return (
		<Link className="btn btn-ghost" href="/">
			<IconDeviceMobile />
			PHONE-SHOP
		</Link>
	);
}
