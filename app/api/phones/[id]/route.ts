import prisma from "@/prisma/client";
import { extractUser } from "../../auth";
import { errorResponse, tryOrNull } from "../../utils";

export async function DELETE(
	_: Request,
	{ params: { id } }: { params: { id: string } },
) {
	const user = await extractUser();
	if (!user?.isAdmin) return errorResponse("Not authorized", 403);

	const deletedPhone = await tryOrNull(
		prisma.phone.delete({ where: { id: Number(id) } }),
	);
	if (!deletedPhone) return errorResponse("Телефон не найден", 404);

	return Response.json({ success: true }, { status: 200 });
}

export async function POST(request: Request) {
	const user = await extractUser();
	if (!user?.isAdmin) return errorResponse("Not authorized", 403);

	const data = await tryOrNull(request.json());
	if (!data) return errorResponse("Неккоректный формат данных", 400);

	const phone = await tryOrNull(prisma.phone.create({ data }));
	if (!phone) return errorResponse("Неккоректные данные", 400);

	return new Response(null, { status: 201 });
}

export async function PATCH(
	request: Request,
	{ params: { id } }: { params: { id: string } },
) {
	const user = await extractUser();
	if (!user?.isAdmin) return errorResponse("Not authorized", 403);

	const data = await tryOrNull(request.json());
	if (!data) return errorResponse("Неккоректный формат данных", 400);

	const editedPhone = await tryOrNull(
		prisma.phone.update({
			where: { id: Number(id) },
			data,
		}),
	);

	if (!editedPhone)
		return errorResponse("Телефон не найден или неккоректные данные", 400);

	return new Response(null, { status: 204 });
}
