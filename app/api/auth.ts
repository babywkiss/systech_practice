import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import * as jose from "jose";
import { cookies } from "next/headers";
import { tryOrNull } from "./utils";

export type Email = string;
export type Password = string;

export type Credentials = {
	email: Email;
	password: Password;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (str: string): str is Email => EMAIL_REGEX.test(str);
export const isPassword = (str: string): str is Password => str.length >= 7;

export const isCredentials = (data: unknown): data is Credentials => {
	return (
		typeof (data as Credentials)?.email === "string" &&
		isEmail((data as Credentials)?.email) &&
		typeof (data as Credentials)?.password === "string" &&
		isPassword((data as Credentials)?.password)
	);
};

export const createToken = (
	user: User,
	expirationTime = "10h",
	extraPayload = {} as any,
) => {
	return new jose.SignJWT({ id: user.id, ...extraPayload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expirationTime)
		.sign(new TextEncoder().encode(process.env.SECRET_JWT));
};

export const decodeToken = (token: string) =>
	tryOrNull(
		jose.jwtVerify(
			token,
			new TextEncoder().encode(process.env.SECRET_JWT ?? ""),
		),
	);

export const extractUser = async () => {
	const token = cookies().get("authToken")?.value;
	if (!token) return null;

	const data = await decodeToken(token);

	const id = data?.payload?.id;
	if (typeof id !== "number") return null;

	return await prisma.user.findUnique({ where: { id } });
};
