import prisma from "@/prisma/client";
import Catalog from "./catalog";
import { extractUser } from "../api/auth";

export default async function CatalogPage() {
	const items = await prisma.phone.findMany();
	const user = await extractUser();

	return <Catalog phones={items} user={user} />;
}
