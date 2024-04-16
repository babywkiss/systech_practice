import { Phone, User } from "@prisma/client";
import Link from "next/link";
import AddToBasketButton from "@/components/addToBasketButton";
import PhoneControl from "@/components/admin/phoneControl";
import { formatPrice } from "../utils";
import Image from "next/image";

export default function PhoneCard({
	phone,
	user,
}: { phone: Phone; user: User | null }) {
	return (
		<div className="flex flex-col gap-3 p-3 w-full rounded-lg md:w-80 bg-base-200 hover:bg-base-100">
			<div className="flex justify-between items-center group">
				<Link
					href={`/items/${phone.id}`}
					className="flex gap-3 items-center text-xl"
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
			<Link className="flex justify-center w-full" href={`/items/${phone.id}`}>
				<Image
					alt="phone-image"
					width={500}
					height={500}
					className="object-cover w-72 rounded-lg transition-all cursor-pointer hover:shadow-xl aspect-square"
					src={phone.imageLink}
				/>
			</Link>
			<span className="flex gap-2">
				Стоимость
				<span className="font-bold text-green-700">
					{formatPrice(phone.priceBYN)} BYN
				</span>
			</span>
			<AddToBasketButton phone={phone} />
		</div>
	);
}
