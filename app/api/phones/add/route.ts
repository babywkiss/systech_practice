import prisma from "@/prisma/client";
import getUser from "../../getUser";

export async function POST(request: Request) {
	const user = await getUser();
	if (!user?.isAdmin)
		return Response.json({ error: "Forbidden" }, { status: 500 });
	const phone = await request.json();
	try {
		const created = await prisma.phone.create({ data: phone });
		return Response.json(created, { status: 200 });
	} catch {
		return Response.json({ error: "Not found" }, { status: 404 });
	}
}
