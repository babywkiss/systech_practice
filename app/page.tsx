import prisma from "@/prisma/client";
import { IconShoppingBag } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import AutoSlider from "./_components/auto-slider";

export default async function MainPage() {
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
		<main className="flex flex-col gap-5 w-full h-full md:flex-row">
			<div className="flex flex-col gap-5 p-3 w-full h-96 md:w-1/3 md:h-full">
				<h3 className="text-3xl font-bold">Новости и акции</h3>
				<AutoSlider className="w-full h-full carousel rounded-box">
					{promos.map(({ imageLink, id }) => (
						<div key={id} className="relative w-full h-full carousel-item">
							<Image
								sizes="100vw"
								fill
								alt="promo-image"
								className="object-cover"
								src={imageLink}
							/>
						</div>
					))}
				</AutoSlider>
			</div>
			<div className="flex flex-col gap-5 p-3 md:w-1/3 md:h-full">
				<h3 className="text-3xl font-bold">Популярные товары</h3>
				<AutoSlider className="w-full h-full carousel rounded-box">
					{mostPopular.map((phone) => {
						return (
							<div key={phone.id} className="w-full carousel-item">
								<div className="w-full rounded-none card bg-base-100">
									<figure className="relative w-full h-96 md:h-full">
										<Image
											sizes="100vw"
											fill
											alt="Phone Image"
											className="object-cover"
											src={phone.imageLink}
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											{phone.manufacturer} {phone.model}
										</h2>
										<div className="justify-end card-actions">
											<Link
												href={`/catalog/${phone.id}`}
												className="btn btn-primary"
											>
												Подробнее
											</Link>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</AutoSlider>
			</div>
			<div className="flex flex-col gap-5 p-3 w-full h-96 md:w-1/3 md:h-full">
				<h3 className="hidden text-3xl font-bold md:block md:invisible">.</h3>
				<Link className="flex-1 w-full rounded-xl btn" href="/catalog">
					<span className="text-5xl font-bold">Каталог</span>
					<IconShoppingBag size="100" />
				</Link>
			</div>
		</main>
	);
}
