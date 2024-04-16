import prisma from "@/prisma/client";
import { extractUser } from "../auth";
import { errorResponse, tryOrNull } from "../utils";

export async function POST(request: Request) {
	const user = await extractUser();
	if (!user?.isAdmin) return errorResponse("Not authorized", 403);

	const data = await tryOrNull(request.json());
	if (!data) return errorResponse("Неккоректный формат данных", 400);

	const phone = await tryOrNull(prisma.phone.create({ data }));
	if (!phone) return errorResponse("Неккоректные данные", 400);

	return new Response(phone.id.toString(), { status: 201 });
}
