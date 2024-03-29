import prisma from "@/prisma/client";

export default async function PhonePage({
	params,
}: { params: { id: string } }) {
	const phone = await prisma.phone.findUnique({
		where: { id: Number(params.id) },
	});
	return phone ? (
		<div>
			<h1 className="text-3xl font-bold">
				{phone.manufacturer} {phone.model}
			</h1>
			<img className="h-64 rounded-lg aspect-square" src={phone.imageLink} />
			<span>{phone.description}</span>
			<ul>
				<li>
					Год выпуска: <span className="font-bold">{phone.releaseYear}</span>
				</li>
				<li>
					Процессор: <span className="font-bold">{phone.cpu}</span>{" "}
				</li>
				<li>
					Оперативная память:{" "}
					<span className="font-bold">{phone.ramGB} GB</span>
				</li>
			</ul>
		</div>
	) : (
		<h1>Товар не найден</h1>
	);
}
