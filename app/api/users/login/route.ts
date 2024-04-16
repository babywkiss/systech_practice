import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { errorResponse, tryOrNull } from "../../utils";
import { createToken, isCredentials } from "../../auth";

export async function POST(request: Request) {
	const data = await tryOrNull(request.json());
	if (!data) return errorResponse("Неверный формат данных", 400);

	const credentials = isCredentials(data) ? data : null;
	if (!credentials) return errorResponse("Неккоректный email или пароль", 400);

	const user = await prisma.user.findUnique({
		where: { email: credentials.email },
	});
	if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash)))
		return errorResponse(
			"Пользователь не существует или пароль не совпадает",
			403,
		);

	const token = await createToken(user);
	cookies().set("authToken", token);

	return new Response(null, { status: 200 });
}
