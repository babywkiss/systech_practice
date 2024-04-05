"use client";

import { useRouter } from "next/navigation";

export default function ToggleStatus({
	user,
}: { user: { id: number; isAdmin: boolean } }) {
	const router = useRouter();

	const handleToggle = (id: number) => {
		fetch(`/api/users/${id}/setStatus`, { method: "PATCH" })
			.then((res) => res.json())
			.then((_) => {
				router.refresh();
			});
	};
	return (
		<button
			onClick={() => {
				handleToggle(user.id);
			}}
			className="btn btn-warning"
		>
			{user.isAdmin ? "Отключить" : "Сделать администратором"}
		</button>
	);
}
