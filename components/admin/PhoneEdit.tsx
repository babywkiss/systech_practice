import { Prisma } from "@prisma/client";

export const DEFAULT_PHONE: Prisma.PhoneCreateInput = {
	manufacturer: "",
	model: "",
	description: "",
	imageLink: "",
	screenSizeInches: 5,
	available_quantity: 10,
	releaseYear: 2024,
	cpu: "",
	ramGB: 3,
	priceBYN: 500,
};

export default function PhoneEdit({
	phone = DEFAULT_PHONE,
	setPhone,
}: {
	phone: Prisma.PhoneCreateInput;
	setPhone: (phone: Prisma.PhoneCreateInput) => void;
}) {
	return (
		<>
			<input
				onInput={(e) =>
					setPhone({
						...phone,
						manufacturer: (e.target as HTMLInputElement).value,
					})
				}
				className="input input-bordered"
				placeholder="Производитель"
				value={phone.manufacturer}
			/>
			<input
				onInput={(e) =>
					setPhone({
						...phone,
						model: (e.target as HTMLInputElement).value,
					})
				}
				className="input input-bordered"
				placeholder="Модель"
				value={phone.model}
			/>
			<input
				onInput={(e) =>
					setPhone({
						...phone,
						cpu: (e.target as HTMLInputElement).value,
					})
				}
				className="input input-bordered"
				placeholder="Процессор"
				value={phone.cpu}
			/>
			<textarea
				onInput={(e) =>
					setPhone({
						...phone,
						description: (e.target as HTMLInputElement).value,
					})
				}
				className="textarea textarea-bordered"
				placeholder="Описание"
				value={phone.description}
			/>
			<div className="flex justify-between items-center">
				<input
					onInput={(e) =>
						setPhone({
							...phone,
							imageLink: (e.target as HTMLInputElement).value,
						})
					}
					className="input input-bordered"
					placeholder="Ссылка на изображение"
					value={phone.imageLink}
				/>
				<img
					className="object-cover h-32 aspect-square"
					src={phone.imageLink}
				/>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<span>Год выпуска</span>
					<input
						onInput={(e) =>
							setPhone({
								...phone,
								releaseYear: Number((e.target as HTMLInputElement).value),
							})
						}
						className="input w-fit input-bordered"
						type="number"
						min={"2000"}
						max={"2024"}
						value={phone.releaseYear}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span>Кол. ОЗУ (ГБ)</span>
					<input
						onInput={(e) =>
							setPhone({
								...phone,
								ramGB: Number((e.target as HTMLInputElement).value),
							})
						}
						className="input w-fit input-bordered"
						type="number"
						min={"0"}
						max={"20"}
						value={phone.ramGB}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span>Размер экрана (Дюймов)</span>
					<input
						onInput={(e) =>
							setPhone({
								...phone,
								screenSizeInches: Number((e.target as HTMLInputElement).value),
							})
						}
						className="input w-fit input-bordered"
						type="number"
						min={"0"}
						max={"10"}
						value={phone.screenSizeInches}
					/>
				</div>
			</div>
			<span>
				Доступное количество ={" "}
				<span className="text-lg font-bold">{phone.available_quantity}</span>
			</span>
			<input
				min={0}
				max={1000}
				step={5}
				value={phone.available_quantity}
				onInput={(e) => {
					setPhone({
						...phone,
						available_quantity: Number((e.target as HTMLInputElement).value),
					});
				}}
				type="range"
				className="range"
			/>
			<div className="flex justify-between items-center">
				<span>0</span>
				<span>1000</span>
			</div>

			<span>
				Стоимость ={" "}
				<span className="text-lg font-bold text-success">{phone.priceBYN}</span>
			</span>
			<input
				min={0}
				max={5000}
				step={10}
				value={phone.priceBYN}
				onInput={(e) => {
					setPhone({
						...phone,
						priceBYN: Number((e.target as HTMLInputElement).value),
					});
				}}
				type="range"
				className="range range-success"
			/>
			<div className="flex justify-between items-center">
				<span>0</span>
				<span>5000</span>
			</div>
		</>
	);
}
