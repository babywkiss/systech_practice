import { extractUser } from "../../auth";
import { errorResponse } from "../../utils";

export async function GET() {
	const user = await extractUser();
	if (!user) return errorResponse("Not authorized", 403);
	return Response.json(user, { status: 200 });
}
