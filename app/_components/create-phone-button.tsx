import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./modal";
import PhoneEdit, { DEFAULT_PHONE } from "./phone-edit";

export default function CreatePhoneButton() {
	const [modalOpen, setModalOpen] = useState(false);
	const [phone, setPhone] = useState(DEFAULT_PHONE);
	const router = useRouter();

	const handleAdd = async () => {
		const res = await fetch("/api/phones/", {
			method: "POST",
			body: JSON.stringify({ ...phone, priceBYN: phone.priceBYN * 100 }),
		});
		const id = await res.text();

		router.push(`/catalog/${id}`);
		router.refresh();
	};

	return (
		<>
			<button
				onClick={() => {
					setModalOpen(true);
				}}
				className="w-full btn btn-info"
			>
				Создать новый телефон
				<IconPlus />
			</button>

			<Modal
				onClose={() => setModalOpen(false)}
				isOpen={modalOpen}
				actions={
					<>
						<button className="btn">Отмена</button>
						<button onClick={handleAdd} className="btn btn-info">
							Добавить
						</button>
					</>
				}
			>
				<h3 className="text-lg font-bold">Создать новый товар</h3>
				<div className="flex flex-col gap-3">
					<PhoneEdit
						phone={phone}
						setPhone={(edited) => setPhone({ ...phone, ...edited })}
					/>
				</div>
			</Modal>
		</>
	);
}
