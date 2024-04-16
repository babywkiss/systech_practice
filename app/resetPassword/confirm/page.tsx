import { decodeToken } from "@/app/api/auth";
import prisma from "@/prisma/client";
import { IconKey } from "@tabler/icons-react";
import ConfirmResetForm from "./confirm-reset-form";

const InvalidMessage = () => <h1>Ссылка не действительна</h1>;

export default async function ConfirmPage({
	searchParams,
}: {
	searchParams?: { token?: string };
}) {
	const data = await decodeToken(searchParams?.token ?? "");
	const id = data?.payload?.id;
	const passwordReset = data?.payload?.passwordReset === true;

	if (typeof id !== "number" || !passwordReset) return <InvalidMessage />;
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return <InvalidMessage />;

	return <ConfirmResetForm token={searchParams?.token ?? ""} user={user} />;
}
