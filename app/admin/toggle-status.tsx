"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ToggleStatus({
	user,
}: { user: { id: number; isAdmin: boolean } }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleToggle = async (id: number) => {
		setLoading(true);
		await fetch(`/api/users/${id}`, {
			method: "PATCH",
			body: JSON.stringify({
				isAdmin: !user.isAdmin,
			}),
		});
		router.refresh();
		setLoading(false);
	};
	return (
		<>
			{loading ? (
				<span className="loading loading-spinner loading-md"></span>
			) : (
				<input
					type="checkbox"
					className="toggle toggle-warning"
					onChange={async () => {
						await handleToggle(user.id);
					}}
					checked={user.isAdmin}
				/>
			)}
		</>
	);
}
