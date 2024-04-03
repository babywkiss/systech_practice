import getUser from "../getUser";

export async function GET() {
	const user = await getUser();
	if (user) return Response.json(user);
	return Response.json({ error: "Not authorized" }, { status: 500 });
}
