"use client";

import DeletePhoneModal from "@/app/_components/delete-phone-modal";
import EditPhoneModal from "@/app/_components/edit-phone-modal";
import PhoneControl from "@/components/admin/phoneControl";
import { Phone } from "@prisma/client";
import { useState } from "react";

export default function PagePhoneControls({ phone }: { phone: Phone }) {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editPhoneModalOpen, setEditPhoneModalOpen] = useState(false);

	const [edited, setEdited] = useState(phone);
	return (
		<>
			<PhoneControl
				verbose
				onEdit={() => {
					setEdited(phone);
					setEditPhoneModalOpen(true);
				}}
				onDelete={() => {
					setDeleteModalOpen(true);
				}}
			/>

			<EditPhoneModal
				phone={edited}
				setPhone={setEdited}
				isOpen={editPhoneModalOpen}
				onClose={() => setEditPhoneModalOpen(false)}
			/>
			<DeletePhoneModal
				phone={phone}
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
			/>
		</>
	);
}
