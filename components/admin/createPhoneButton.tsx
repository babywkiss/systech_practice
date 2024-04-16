import { IconPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";
import PhoneEdit, { DEFAULT_PHONE } from "./PhoneEdit";
import { useRouter } from "next/navigation";

export default function CreatePhoneButton() {
	const modalRef = useRef<HTMLDialogElement>(null);
	const [phone, setPhone] = useState(DEFAULT_PHONE);
	const router = useRouter();

	const handleAdd = () => {
		fetch("/api/phones/", {
			method: "POST",
			body: JSON.stringify({ ...phone, priceBYN: phone.priceBYN * 100 }),
		})
			.then((data) => data.text())
			.then((id) => {
				router.push(`/catalog/${id}`);
			});
	};

	return (
		<div className="flex group">
			<button
				onClick={() => {
					modalRef.current?.showModal();
				}}
				className="w-full btn btn-info"
			>
				Создать новый телефон
				<IconPlus />
			</button>
			<dialog ref={modalRef} className="invisible group-hover:visible modal">
				<div className="flex overflow-auto flex-col gap-2 modal-box [&>*]:shrink-0">
					<h3 className="text-lg font-bold">Создать новый товар</h3>
					<PhoneEdit phone={phone} setPhone={setPhone} />
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Отмена</button>
						</form>
						<form onClick={handleAdd} method="dialog">
							<button className="btn btn-info">Добавить</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
