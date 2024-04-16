import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { createToken, decodeToken, isEmail, isPassword } from "../../auth";
import { errorResponse, tryOrNull } from "../../utils";
import resend from "./resend";
import { cookies } from "next/headers";

const generateMailBody = (token: string, baseUrl = "localhost:3000") => {
	const url = new URL(`${baseUrl}/resetPassword/confirm`);
	url.searchParams.append("token", token);
	return `
<h1>Перейдите по ссылке чтобы указать новый пароль</h1>
<h3>Phone-Shop</h3>
Данная ссылка действительная в течении 10 минут
<a href="http://${url.toString()}">Восстановить пароль</a>
`;
};

export async function POST(req: Request) {
	const data = await tryOrNull(req.formData());
	const email = data?.get("email")?.toString();

	if (!isEmail(email ?? "")) return errorResponse("Неккоректный email", 400);

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) return errorResponse("Такого пользователя не существует", 400);

	const token = await createToken(user, "10m", { passwordReset: true });
	const result = await resend.emails.send({
		from: "phoneShop@resend.dev",
		to: user.email,
		subject: "Восстановление пароля на Phone-Shop",
		html: generateMailBody(token),
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
