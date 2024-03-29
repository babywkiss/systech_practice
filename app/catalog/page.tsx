import prisma from "@/prisma/client";
import { Phone } from "@prisma/client";
import Link from "next/link";

const PhoneCard = ({ phone }: { phone: Phone }) => {
	return (
		<div className="flex flex-col gap-3 p-3 bg-blue-100 rounded-lg w-fit h-fit">
			<Link
				href={`/items/${phone.id}`}
				className="flex gap-3 items-center text-xl"
			>
				<span className="font-bold">{phone.manufacturer}</span>
				<span>{phone.model}</span>
			</Link>
			<img className="h-64 rounded-lg aspect-square" src={phone.imageLink} />
			<span className="flex gap-2">
				Стоимость
				<span className="font-bold text-green-700">
					{phone.priceBYN / 100} BYN
				</span>
			</span>
		</div>
	);
};

export default async function CatalogPage() {
	const items = await prisma.phone.findMany();
	return (
		<div className="flex flex-wrap gap-3">
			{items.map((phone) => (
				<PhoneCard key={phone.id} phone={phone} />
			))}
		</div>
	);
}
