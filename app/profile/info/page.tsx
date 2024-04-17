import { extractUser } from "@/app/api/auth";
import OrdersList from "./orders-list";
import ProfileInfo from "./profile-info";
import Link from "next/link";
import prisma from "@/prisma/client";

export default async function ProfileInfoPage() {
	const user = await extractUser();
	if (!user)
		return (
			<div className="flex justify-center items-center w-full h-full">
				<Link href="/login" className="btn btn-primary md:w-fit">
					Войти в аккаунт
				</Link>
			</div>
		);

	const orders = await prisma.order.findMany({
		where: { customerId: user?.id },
		include: { items: true },
	});

	return (
		<div className="flex flex-col gap-5 w-full h-full">
			<ProfileInfo user={user} />
			<span className="text-lg font-bold text-neutral-500">Список заказов</span>
			<OrdersList user={user} orders={orders} />
		</div>
	);
}
