import prisma from "@/prisma/client";
import { IconCalendar, IconCpu, IconDisc } from "@tabler/icons-react";

// TODO: Add to basket button handler

export default async function PhonePage({
	params,
}: { params: { id: string } }) {
	const phone = await prisma.phone.findUnique({
		where: { id: Number(params.id) },
	});
	return phone ? (
		<div className="flex overflow-auto flex-col gap-3 w-full h-full">
			<h1 className="text-3xl font-bold">
				{phone.manufacturer} {phone.model}
			</h1>
			<span className="text-green-500">
				В наличии: {phone.available_quantity}
			</span>
			<img className="object-cover h-96 rounded-lg" src={phone.imageLink} />
			<span className="py-3 px-5 w-full break-words bg-gray-200 rounded-lg">
				{phone.description}
			</span>
			<ul>
				<li className="flex">
					<IconCalendar />
					Год выпуска: <span className="font-bold">{phone.releaseYear}</span>
				</li>
				<li className="flex">
					<IconCpu />
					Процессор: <span className="font-bold">{phone.cpu}</span>{" "}
				</li>
				<li className="flex">
					<IconDisc />
					Оперативная память:{" "}
					<span className="font-bold">{phone.ramGB} GB</span>
				</li>
			</ul>
			<button className="bg-green-500 btn btn-filled">
				Добавить в корзину
			</button>
		</div>
	) : (
		<h1>Товар не найден</h1>
	);
}
