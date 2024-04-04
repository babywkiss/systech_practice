import prisma from "@/prisma/client";
import * as jose from "jose";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const { email, password } = (await request.json()) as {
		email: string;
		password: string;
	};
	try {
		const { id } = await prisma.user.create({
			data: { email, passwordHash: await bcrypt.hash(password, 10) },
		});
		const token = await new jose.SignJWT({ id })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("10h")
			.sign(new TextEncoder().encode(process.env.SECRET_JWT));
		cookies().set("authToken", token);
		return Response.json({ token });
	} catch {
		return Response.json(
			{ error: "Пользователь с таким email уже существует" },
			{ status: 500 },
		);
	}
}
