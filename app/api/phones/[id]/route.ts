import prisma from "@/prisma/client";
import getUser from "../../getUser";

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } },
) {
	const user = await getUser();
	if (!user?.isAdmin)
		return Response.json({ error: "Forbidden" }, { status: 500 });
	const phone = await prisma.phone.findUnique({
		where: { id: Number(params.id) },
	});
	if (!phone) return Response.json({ error: "Not found" }, { status: 404 });
	await prisma.phone.delete({ where: { id: phone.id } });
	return Response.json({ success: true }, { status: 200 });
}
