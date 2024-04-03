import { cookies } from "next/headers";
import prisma from "@/prisma/client";
import * as jose from "jose";

export default async function getUser() {
	const token = cookies().get("authToken")?.value;
	if (!token) return null;

	try {
		const data = await jose.jwtVerify(
			token,
			new TextEncoder().encode(process.env.SECRET_JWT ?? ""),
		);
		const userId = data.payload.id as number;
		const user = await prisma.user.findUnique({ where: { id: userId } });
		return user;
	} catch {
		return null;
	}
}
