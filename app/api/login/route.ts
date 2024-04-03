import prisma from "@/prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const { email, password } = (await request.json()) as {
		email: string;
		password: string;
	};
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user || !(await bcrypt.compare(password, user.passwordHash)))
		return Response.json(
			{ error: "Пользователь не существует или пароль не совпадает" },
			{ status: 500 },
		);
	const token = await new jose.SignJWT({ id: user.id })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10h")
		.sign(new TextEncoder().encode(process.env.SECRET_JWT));
	cookies().set("authToken", token);
	return Response.json({ token });
}
