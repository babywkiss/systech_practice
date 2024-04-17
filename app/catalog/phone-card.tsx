import { Phone, User } from "@prisma/client";
import Link from "next/link";
import AddToBasketButton from "@/components/addToBasketButton";
import PhoneControl from "@/components/admin/phoneControl";
import { formatPrice } from "../utils";
import Image from "next/image";
import { IconBan } from "@tabler/icons-react";

export default function PhoneCard({
	phone,
	user,
}: { phone: Phone; user: User | null }) {
	return (
		<div className="flex flex-col gap-3 p-3 w-full rounded-lg transition-all md:w-80 hover:shadow-xl bg-base-200 hover:bg-base-100">
			<div className="flex justify-between items-center group">
				<Link
					href={`/catalog/${phone.id}`}
					className="flex gap-3 items-center w-full text-xl"
				>
					<span className="font-bold">{phone.manufacturer}</span>
					<span>{phone.model}</span>
					{phone.available_quantity === 0 && (
						<span className="text-sm text-error">Нет в наличии</span>
					)}
				</Link>
				<div className="md:invisible group-hover:visible">
					{user?.isAdmin === true && <PhoneControl phone={phone} />}
				</div>
			</div>
			<Link
				className="flex justify-center w-full"
				href={`/catalog/${phone.id}`}
			>
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
			<AddToBasketButton phone={phone} />
		</div>
	);
}
