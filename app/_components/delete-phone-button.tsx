import { Phone } from "@prisma/client";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

export default function DeletePhoneButton({ phone }: { phone: Phone }) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		await fetch(`/api/phones/${phone.id}`, { method: "DELETE" });
		router.refresh();
	};
	return (
		<>
			<button
				onClick={() => {
					setIsOpen(true);
				}}
				className="btn btn-error btn-sm btn-outline"
			>
				<IconTrash />
				Удалить
			</button>
			<Modal
				onClose={() => setIsOpen(false)}
				isOpen={isOpen}
				actions={
					<>
						<button className="btn">Отмена</button>
						<button onClick={handleDelete} className="btn btn-error">
							Удалить
						</button>
					</>
				}
			>
				<h3 className="text-lg font-bold">
					Удалить товар {phone.manufacturer} {phone.model} ?
				</h3>
				<p className="py-4">Нажмите отмена чтобы отменить действие.</p>
			</Modal>
		</>
	);
}
