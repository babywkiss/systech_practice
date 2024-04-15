import { cookies } from "next/headers";

export async function GET() {
	cookies().delete("authToken");
	return Response.json({ success: true });
}
