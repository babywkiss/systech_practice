"use client";

import { Phone } from "@prisma/client";
import DeletePhoneButton from "./delete-phone-button";
import EditPhoneButton from "./edit-phone-button";

export default function PhoneControls({ phone }: { phone: Phone }) {
	return (
		<>
			<div className="flex gap-2 items-center">
				<DeletePhoneButton phone={phone} />
				<EditPhoneButton phone={phone} />
			</div>
		</>
	);
}
