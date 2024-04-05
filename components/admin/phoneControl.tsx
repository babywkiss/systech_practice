import { Phone } from "@prisma/client";
import DeletePhoneButton from "./deletePhoneButton";
import EditPhoneButton from "./editPhoneButton";

// TODO: Implement phone edit

export default function PhoneControl({ phone }: { phone: Phone }) {
	return (
		<div className="flex gap-2 items-center">
			<DeletePhoneButton phone={phone} />
			<EditPhoneButton phone={phone} />
		</div>
	);
}
