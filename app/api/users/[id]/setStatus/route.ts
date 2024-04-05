import getUser from "@/app/api/getUser";
import prisma from "@/prisma/client";

export async function PATCH(
	_: Request,
	{ params }: { params: { id: string } },
) {
	const user = await getUser();
	if (!user?.isSuperAdmin)
		return Response.json({ error: "Forbidden" }, { status: 500 });
	const target = await prisma.user.findUnique({
		where: { id: Number(params.id) },
	});
	if (!target) return Response.json({ error: "Not found" }, { status: 404 });

	await prisma.user.update({
		where: { id: target.id },
		data: { isAdmin: !target.isAdmin },
	});
	return Response.json({ success: true }, { status: 200 });
}
