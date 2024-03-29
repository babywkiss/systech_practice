import getUser from "../getUser";

export async function GET(request: Request) {
	const user = await getUser(request);
	if (user) return Response.json(user);
	return Response.json({ error: "Not authorized" }, { status: 500 });
}
