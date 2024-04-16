import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { createToken, isCredentials } from "../auth";
import { errorResponse, tryOrNull } from "../utils";

export async function POST(request: Request) {
	const data = await tryOrNull(request.json());
	if (!data) return errorResponse("Неверный формат данных", 400);

	const credentials = isCredentials(data) ? data : null;
	if (!credentials) return errorResponse("Неккоректный email или пароль", 400);

	const user = await tryOrNull(
		prisma.user.create({
			data: {
				email: credentials.email,
				passwordHash: await bcrypt.hash(credentials.password, 10),
			},
		}),
	);
	if (!user) return errorResponse("Пользователь уже существует", 400);

	const token = await createToken(user);
	cookies().set("authToken", token);

	return new Response(null, { status: 201 });
}
