import { Phone } from "@prisma/client";
import Modal from "./modal";
import { useRouter } from "next/navigation";

export default function DeletePhoneModal({
	isOpen,
	onClose,
	phone,
}: { isOpen: boolean; onClose: () => void; phone: Phone }) {
	const router = useRouter();

	const handleDelete = async () => {
		await fetch(`/api/phones/${phone.id}`, { method: "DELETE" });
		router.refresh();
	};
	return (
		<Modal
			onClose={onClose}
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
	);
}
