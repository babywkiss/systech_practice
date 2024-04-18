import { Phone } from "@prisma/client";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import PhoneEdit from "./phone-edit";

export default function EditPhoneModal({
	isOpen,
	onClose,
	phone,
	setPhone,
}: {
	isOpen: boolean;
	onClose: () => void;
	phone: Phone;
	setPhone: (phone: Phone) => void;
}) {
	const router = useRouter();

	const handleEdit = async () => {
		await fetch(`/api/phones/${phone.id}`, {
			method: "PATCH",
			body: JSON.stringify(phone),
		});
		router.push(`/catalog/${phone.id}`);
		router.refresh();
	};
	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			actions={
				<>
					<button className="btn">Отмена</button>
					<button onClick={handleEdit} className="btn btn-info">
						Сохранить
					</button>
				</>
			}
		>
			<h3 className="text-lg font-bold">Редактировать товар</h3>
			<div className="flex flex-col gap-3">
				<PhoneEdit
					phone={phone}
					setPhone={(edited) => setPhone({ ...phone, ...edited })}
				/>
			</div>
		</Modal>
	);
}
