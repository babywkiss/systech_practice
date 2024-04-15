"use client";

import { IconEdit } from "@tabler/icons-react";
import PhoneEdit from "./PhoneEdit";
import { Phone } from "@prisma/client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPhoneButton({
	phone,
	children,
}: { phone: Phone; children?: React.ReactNode }) {
	const router = useRouter();
	const getDefault = (phone: Phone) => ({
		...phone,
		priceBYN: phone.priceBYN / 100,
	});
	const [newPhone, setNewPhone] = useState(getDefault(phone));
	const modalRef = useRef<HTMLDialogElement>(null);

	const handleConfirm = () => {
		fetch(`/api/phones/${phone.id}`, {
			method: "PATCH",
			body: JSON.stringify({ ...newPhone, priceBYN: newPhone.priceBYN * 100 }),
		})
			.then((res) => res.json())
			.then((data) => {
				const id = data?.id;
				router.push(`/items/${id}`);
				router.refresh();
			});
	};
	return (
		<>
			<button
				onClick={() => {
					modalRef.current?.showModal();
				}}
				className={`btn btn-info ${
					children ? "" : "btn-square"
				} btn-sm btn-outline`}
			>
				<IconEdit />
				{children}
			</button>

			<dialog ref={modalRef} className="modal">
				<div className="flex overflow-auto flex-col gap-2 modal-box [&>*]:shrink-0">
					<h3 className="text-lg font-bold">Редактировать товар</h3>
					<PhoneEdit
						phone={newPhone}
						setPhone={(phone) =>
							setNewPhone((prev) => {
								return { ...prev, ...phone };
							})
						}
					/>
					<div className="modal-action">
						<form method="dialog">
							<button
								onClick={() => {
									setNewPhone(getDefault(phone));
								}}
								className="btn"
							>
								Отмена
							</button>
						</form>
						<form onClick={handleConfirm} method="dialog">
							<button className="btn btn-info">Сохранить</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
