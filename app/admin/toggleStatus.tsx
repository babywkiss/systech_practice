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
		<>
			<input
				type="checkbox"
				className="toggle toggle-warning"
				onInput={() => {
					handleToggle(user.id);
				}}
				checked={user.isAdmin}
			/>
		</>
	);
}
