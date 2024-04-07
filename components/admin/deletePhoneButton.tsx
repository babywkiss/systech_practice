"use client";

import { Phone } from "@prisma/client";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function DeletePhoneButton({
	phone,
	children,
}: { phone: Phone; children?: React.ReactNode }) {
	const modalRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();

	const handleDelete = () => {
		fetch(`/api/phones/${phone.id}`, { method: "DELETE" })
			.then((res) => res.json())
			.then((_) => {
				router.refresh();
			});
	};
	return (
		<>
			<button
				onClick={() => {
					modalRef.current?.showModal();
				}}
				className={`btn btn-error ${
					children ? "" : "btn-square"
				} btn-sm btn-outline`}
			>
				<IconTrash />
				{children}
			</button>
			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold">
						Удалить товар {phone.manufacturer} {phone.model} ?
					</h3>
					<p className="py-4">Нажмите отмена чтобы отменить действие.</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Отмена</button>
						</form>
						<form method="dialog">
							<button onClick={handleDelete} className="btn btn-error">
								Удалить
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
