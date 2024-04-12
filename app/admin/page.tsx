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
						<tr key={u.id}>
							<td>{u.id}</td>
							<td>{u.email}</td>
							<td className="flex gap-5 items-center">
								<ToggleStatus user={u} />
								<span>{u.isAdmin ? "Администратор" : "Нет"}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
