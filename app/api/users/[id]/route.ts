import prisma from "@/prisma/client";
import { extractUser } from "../../auth";
import { errorResponse, tryOrNull } from "../../utils";

export async function PATCH(
	req: Request,
	{ params: { id } }: { params: { id: string } },
) {
	const user = await extractUser();
	if (!user?.isSuperAdmin) return errorResponse("Not authorized", 403);

	const data = await tryOrNull(req.json());
	const isAdmin = data?.isAdmin;
	if (!(typeof isAdmin === "boolean"))
		return errorResponse("Неккоректный формат данных", 400);

	const updatedUser = await tryOrNull(
		prisma.user.update({
			where: { id: Number(id) },
			data: { isAdmin },
		}),
	);
	if (!updatedUser) return errorResponse("Пользователь не существует", 400);
	return new Response(null, { status: 204 });
}
