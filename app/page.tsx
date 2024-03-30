import Slider from "@/components/slider";
import prisma from "@/prisma/client";
import { IconBasket } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";

const Card: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="p-3 w-full bg-gray-200 rounded-lg">{children}</div>;
};

export default async function Home() {
	const mostPopular = await prisma.phone.findMany({
		include: {
			_count: {
				select: { orders: true },
			},
		},
		orderBy: {
			orders: {
				_count: "desc",
			},
		},
		take: 5,
	});
	const promos = await prisma.promo.findMany();
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-blue-500">Главная страница</h1>
			<div className="flex flex-col gap-3 lg:flex-row shrink-0">
				<Card>
					<h3 className="text-xl font-bold text-gray-600">Новости и акции</h3>
					<Slider
						items={promos.map(({ imageLink }) => (
							<div className="flex justify-center p-5 w-full">
								<img className="object-cover w-full h-64" src={imageLink} />
							</div>
						))}
					/>
				</Card>
				<Card>
					<h3 className="text-xl font-bold text-gray-600">Популярные товары</h3>
					<Slider
						items={mostPopular.map((phone) => {
							return (
								<div className="flex justify-center p-5 w-full">
									<img
										className="object-cover w-full h-64"
										src={phone.imageLink}
									/>
									<div className="flex absolute bottom-10 left-10 gap-3 items-center p-3 bg-white rounded-lg">
										<span className="font-bold">{phone.model}</span>
										<Link
											className="btn btn-outline"
											href={`/items/${phone.id}`}
										>
											Посмотреть в каталоге
										</Link>
									</div>
								</div>
							);
						})}
					/>
				</Card>
			</div>
			<Link
				href="/catalog"
				className="flex flex-col justify-center items-center w-64 h-64 btn btn-filled"
			>
				<span className="text-3xl font-bold">Перейти в каталог</span>
				<IconBasket size={"70px"} />
			</Link>
		</div>
	);
}
