import { Prisma } from "@prisma/client";
import PhoneCard from "./phone-card";
import prisma from "@/prisma/client";
import PagesSetter from "./pages-setter";
import ScrollRestore from "./scroll-restore";

const ITEMS_PER_PAGE = 9;

export default async function PhonesList({
	options: { query, page, sort, onlyInStock, maxPrice },
}: {
	options: {
		query: string;
		page: number;
		sort: "asc" | "desc";
		onlyInStock: boolean;
		maxPrice: number;
	};
}) {
	const prismaQuery: Prisma.PhoneFindManyArgs = {
		skip: ITEMS_PER_PAGE * page,
		take: ITEMS_PER_PAGE,
		orderBy: {
			priceBYN: sort,
		},
		where: {
			available_quantity: onlyInStock ? { gt: 0 } : undefined,
			priceBYN: { lte: maxPrice },
			AND: [
				{
					manufacturer: {
						contains: query.split(" ")[0],
					},
				},
				{
					model: {
						contains: query.split(" ")[1],
					},
				},
			],
		},
	};

	const [phones, count] = await prisma.$transaction([
		prisma.phone.findMany(prismaQuery),
		prisma.phone.count({ where: prismaQuery.where }),
	]);

	const totalPages = Math.round(count / ITEMS_PER_PAGE);

	return (
		<>
			<PagesSetter totalPages={totalPages} />
			<ScrollRestore />
			<div className="flex overflow-auto flex-col flex-1 gap-1 items-center rounded-lg md:flex-row md:flex-wrap md:justify-center">
				{phones.length > 0 ? (
					phones.map((phone) => <PhoneCard key={phone.id} phone={phone} />)
				) : (
					<div className="flex justify-center items-center w-full h-full">
						<span className="text-2xl font-bold text-neutral-500">
							Товары не найдены
						</span>
					</div>
				)}
			</div>
		</>
	);
}
