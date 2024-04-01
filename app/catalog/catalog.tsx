"use client";

import { Phone } from "@prisma/client";
import PhoneCard from "./phone-card";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 10;

type Filters = {
	searchQuery: string;
	maxPrice: number;
	onlyAvailable: boolean;
};

const CatalogOptions = ({
	filters,
	setFilters,
	setIsSortAsc,
}: {
	filters: Filters;
	setFilters: (filters: Filters) => void;
	setIsSortAsc: (isSortAsc: boolean) => void;
}) => {
	return (
		<div className="flex flex-col gap-2 py-3 w-full">
			<input
				onInput={(e) => {
					setFilters({
						...filters,
						searchQuery: (e.target as HTMLInputElement).value,
					});
				}}
				placeholder="Поиск по названию"
				className="input"
			/>
			<span>Сортировать по</span>
			<select
				onChange={(e) => {
					setIsSortAsc(e.target.value === "asc");
				}}
				defaultValue={"asc"}
			>
				<option value="asc">По возрастанию цены</option>
				<option value="desc">По убыванию цены</option>
			</select>
			<span>Только в наличии</span>
			<input
				type="checkbox"
				onInput={() => {
					setFilters({
						...filters,
						onlyAvailable: !filters.onlyAvailable,
					});
				}}
				defaultChecked={filters.onlyAvailable}
			/>
			<span>Максимальная цена (BYN) {filters.maxPrice}</span>
			<input
				onInput={(e) => {
					setFilters({
						...filters,
						maxPrice: Number((e.target as HTMLInputElement).value),
					});
				}}
				value={filters.maxPrice}
				min="0"
				max="7000"
				step="100"
				type="range"
			/>
			<span>0 - 7000 BYN</span>
		</div>
	);
};

export default function Catalog({ phones }: { phones: Phone[] }) {
	const [page, setPage] = useState(0);
	const [filters, setFilters] = useState({
		searchQuery: "",
		maxPrice: 7000,
		onlyAvailable: false,
	});
	const [isSortAsc, setIsSortAsc] = useState(true);

	const filterPhones = () => {
		return phones.filter(
			(phone) =>
				phone.priceBYN / 100 <= filters.maxPrice &&
				(filters.onlyAvailable ? phone.available_quantity > 0 : true) &&
				(phone.model
					.toLowerCase()
					.includes(filters.searchQuery.toLowerCase()) ||
					phone.manufacturer
						.toLowerCase()
						.includes(filters.searchQuery.toLowerCase())),
		);
	};

	const filteredPhones = useMemo(() => filterPhones(), [filters, phones]);
	const getPagesCount = () =>
		Math.floor(filteredPhones.length / ITEMS_PER_PAGE) +
		Number(filteredPhones.length % ITEMS_PER_PAGE !== 0);

	return (
		<div className="flex flex-col gap-3 h-full md:flex-row shrink-0">
			<details className="flex p-3 w-full h-full bg-blue-100 rounded-lg md:w-1/3">
				<summary className="text-xl font-bold">Фильтры</summary>
				<CatalogOptions
					filters={filters}
					setFilters={(filters) => {
						setFilters(filters);
						setPage(0);
					}}
					setIsSortAsc={setIsSortAsc}
				/>
			</details>
			<div className="flex flex-col h-full">
				<div className="flex items-center p-2">
					<span>Страница:</span>
					<div className="flex flex-wrap gap-2 justify-center w-full">
						{Array.from({ length: getPagesCount() }, (_, i) => (
							<button
								key={i}
								onClick={() => {
									setPage(i);
								}}
								className={`btn ${i === page ? "btn-filled" : "btn-outline"}`}
							>
								{i + 1}
							</button>
						))}
					</div>
				</div>
				<div className="flex overflow-auto flex-wrap gap-1 items-center h-full">
					{filteredPhones.length > 0 ? (
						filteredPhones
							.toSorted(({ priceBYN: aPrice }, { priceBYN: bPrice }) => {
								return isSortAsc ? aPrice - bPrice : bPrice - aPrice;
							})
							.slice(
								ITEMS_PER_PAGE * page,
								ITEMS_PER_PAGE * page + ITEMS_PER_PAGE,
							)
							.map((phone) => <PhoneCard key={phone.id} phone={phone} />)
					) : (
						<span className="text-2xl">Товары не найдены</span>
					)}
				</div>
			</div>
		</div>
	);
}
