import Slider from "@/components/slider";
import prisma from "@/prisma/client";
import { FC } from "react";

const Card: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="p-3 w-full bg-gray-200 rounded-lg">{children}</div>;
};

export default async function Home() {
	const promos = await prisma.promo.findMany();
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-blue-500">Главная страница</h1>
			<div className="flex flex-col gap-3 lg:flex-row">
				<Card>
					<h3 className="text-xl font-bold text-gray-600">Новости и акции</h3>
					<Slider
						items={promos.map(({ imageLink }) => (
							<img className="h-64" src={imageLink} />
						))}
					/>
				</Card>
				<Card>
					<h3 className="text-xl font-bold text-gray-600">Популярные товары</h3>
				</Card>
			</div>
		</div>
	);
}
