import prisma from "@/prisma/client";
import getUser from "../../getUser";

export async function PUT(request: Request) {
	const user = await getUser();
	if (!user?.isAdmin)
		return Response.json({ error: "Forbidden" }, { status: 500 });
	const phone = await request.json();
	try {
		const edited = await prisma.phone.update({
			where: { id: phone.id },
			data: phone,
		});
		return Response.json(edited, { status: 200 });
	} catch {
		return Response.json({ error: "Not found" }, { status: 404 });
	}
}
