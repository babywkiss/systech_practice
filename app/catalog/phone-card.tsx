import { Phone } from "@prisma/client";
import Link from "next/link";
import { formatPrice } from "../utils";
import Image from "next/image";
import { IconBan } from "@tabler/icons-react";
import AddToBasketButton from "../_components/add-to-basket-button";
import PhoneControls from "../_components/phone-controls";
import { extractUser } from "../api/auth";

export default async function PhoneCard({
	phone,
}: {
	phone: Phone;
}) {
	const user = await extractUser();

	return (
		<div
			id={`phone-${phone.id}`}
			className="flex flex-col gap-3 p-3 w-full rounded-lg transition-all md:w-80 hover:shadow-xl bg-base-200 hover:bg-base-100"
		>
			<Link
				href={`/catalog/${phone.id}`}
				className="flex flex-col gap-3 items-center"
			>
				<div className="flex gap-3 justify-between items-center w-full">
					<span className="flex gap-2 items-center text-xl">
						<span className="font-bold">{phone.manufacturer}</span>
						{phone.model}
					</span>
					{phone.available_quantity === 0 && (
						<span className="text-sm text-error">Нет в наличии</span>
					)}
				</div>
				{phone.imageLink ? (
					<Image
						alt="phone-image"
						width={500}
						height={500}
						className="object-cover w-48 rounded-lg cursor-pointer md:w-72 aspect-square"
						src={phone.imageLink}
					/>
				) : (
					<div className="flex flex-col gap-3 justify-center items-center w-48 md:w-72 aspect-square text-neutral-500">
						<IconBan size={100} />
						<span>Нет изображения</span>
					</div>
				)}
			</Link>
			<span className="flex gap-2">
				Стоимость
				<span className="font-bold text-success">
					{formatPrice(phone.priceBYN)} BYN
				</span>
			</span>
			<div className="flex justify-center w-full">
				{user?.isAdmin === true && <PhoneControls phone={phone} />}
			</div>
			<AddToBasketButton phone={phone} />
		</div>
	);
}
