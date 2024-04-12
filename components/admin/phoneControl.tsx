import { Phone } from "@prisma/client";
import DeletePhoneButton from "./deletePhoneButton";
import EditPhoneButton from "./editPhoneButton";

export default function PhoneControl({
	phone,
	verbose = false,
}: { phone: Phone; verbose?: boolean }) {
	return (
		<div className="flex gap-2 items-center">
			<DeletePhoneButton phone={phone}>
				{verbose && "Удалить"}
			</DeletePhoneButton>
			<EditPhoneButton phone={phone}>
				{verbose && "Редактировать"}
			</EditPhoneButton>
		</div>
	);
}
