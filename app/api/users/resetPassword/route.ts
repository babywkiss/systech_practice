import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { createToken, decodeToken, isEmail, isPassword } from "../../auth";
import { errorResponse, tryOrNull } from "../../utils";
import resend from "./resend";
import { cookies } from "next/headers";
import Mail from "./mail";

export async function POST(req: Request) {
	const data = await tryOrNull(req.formData());
	const email = data?.get("email")?.toString();

	if (!isEmail(email ?? "")) return errorResponse("Неккоректный email", 400);

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) return errorResponse("Такого пользователя не существует", 400);

	const token = await createToken(user, "10m", { passwordReset: true });
	const result = await resend.emails.send({
		from: process.env.MAIL_DOMAIN ?? "phoneshop@nicejji.studio",
		to: user.email,
		subject: "Восстановление пароля на Phone-Shop",
		react: Mail({
			token,
			baseUrl: process.env.DOMAIN ?? "https://localhost:3000",
		}),
	});

	if (result.error) {
		console.log(result.error);
		return errorResponse(
			"Не удалось отправить сообщение на указанный адрес.",
			500,
		);
	}
	return new Response(null, { status: 200 });
}

export async function PATCH(req: Request) {
	const reqData = await tryOrNull(req.json());
	const token = reqData?.token;
	const newPassword = reqData?.newPassword;

	const data = await decodeToken(token ?? "");
	const id = data?.payload?.id;
	const passwordReset = data?.payload?.passwordReset === true;

	if (typeof id !== "number" || !passwordReset)
		return errorResponse("Cсылка не действительна", 400);
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return errorResponse("Cсылка не действительна", 400);
	if (!isPassword(newPassword ?? ""))
		return errorResponse("Слишком короткий пароль.", 400);

	const updatedUser = await tryOrNull(
		prisma.user.update({
			where: { id: user.id },
			data: {
				passwordHash: await bcrypt.hash(newPassword, 10),
			},
		}),
	);
	if (!updatedUser) return errorResponse("Unknown error", 500);

	const loginToken = await createToken(user);
	cookies().set("authToken", loginToken);

	return new Response(null, { status: 200 });
}
