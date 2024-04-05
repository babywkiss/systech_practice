import prisma from "@/prisma/client";
import getUser from "../api/getUser";
import ToggleStatus from "./toggleStatus";

export default async function AdminPage() {
	const user = await getUser();
	if (!user?.isSuperAdmin) return null;
	const users = (await prisma.user.findMany()).map(
		({ id, isAdmin, email }) => ({ id, isAdmin, email }),
	);
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Email</th>
						<th>Статус Администратора</th>
					</tr>
				</thead>
				<tbody>
					{users.map((u) => (
						<tr>
							<th>{u.id}</th>
							<th>{u.email}</th>
							<th className="flex gap-5 items-center">
								<span>{u.isAdmin ? "Администратор" : "Нет"}</span>
								<ToggleStatus user={u} />
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
