import { Phone } from "@prisma/client";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import PhoneEdit from "./phone-edit";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

export default function EditPhoneButton({ phone }: { phone: Phone }) {
	const [edited, setEdited] = useState(phone);

	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const handleEdit = async () => {
		await fetch(`/api/phones/${edited.id}`, {
			method: "PATCH",
			body: JSON.stringify(edited),
		});
		router.push(`/catalog/${edited.id}`);
		router.refresh();
	};
	return (
		<>
			<button
				onClick={() => {
					setEdited(phone);
					setIsOpen(true);
				}}
				className="btn btn-info btn-sm btn-outline"
			>
				Редактировать
				<IconEdit />
			</button>

			<Modal
				onClose={() => setIsOpen(false)}
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
						phone={edited}
						setPhone={(edited) => setEdited({ ...phone, ...edited })}
					/>
				</div>
			</Modal>
		</>
	);
}
