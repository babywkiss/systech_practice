import { decodeToken } from "@/app/api/auth";
import prisma from "@/prisma/client";
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
	const resetCount = data?.payload?.resetCount;

	if (
		typeof id !== "number" ||
		!passwordReset ||
		typeof resetCount !== "number"
	)
		return <InvalidMessage />;
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user || user.passwordResets !== resetCount) return <InvalidMessage />;

	return <ConfirmResetForm token={searchParams?.token ?? ""} user={user} />;
}
