import { Phone } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import DeletePhoneButton from "./deletePhoneButton";

// TODO: Implement phone edit

export default function PhoneControl({ phone }: { phone: Phone }) {
	return (
		<div className="flex gap-2 items-center">
			<DeletePhoneButton phone={phone} />
			<button className="btn btn-info btn-square btn-sm btn-outline">
				<IconEdit />
			</button>
		</div>
	);
}
