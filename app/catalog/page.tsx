import prisma from "@/prisma/client";
import Catalog from "./catalog";

export default async function CatalogPage() {
	const items = await prisma.phone.findMany();
	return <Catalog phones={items} />;
}
