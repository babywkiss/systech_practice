import prisma from "@/prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	const { email, password } = (await request.json()) as {
		email: string;
		password: string;
	};
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user)
		return Response.json({ error: "Пользователь не найден" }, { status: 500 });
	if (!(await bcrypt.compare(password, user.passwordHash)))
		return Response.json({ error: "Пароль не совпадает" }, { status: 500 });
	const token = await new jose.SignJWT({ id: user.id })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10h")
		.sign(new TextEncoder().encode(process.env.SECRET_JWT));
	return Response.json({ token });
}
