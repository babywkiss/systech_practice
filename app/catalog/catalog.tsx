"use client";

import { Phone } from "@prisma/client";
import PhoneCard from "./phone-card";
import { useState } from "react";

export default function Catalog({ phones }: { phones: Phone[] }) {
	const [filters, setFilters] = useState({
		searchQuery: "",
		maxPrice: 7000,
		onlyAvailable: false,
		sortBy: "asc" as "asc" | "desc",
	});
	return (
		<div className="flex flex-wrap gap-3 h-full">
			<div className="flex flex-col gap-3 p-3 w-72 h-full bg-blue-200 rounded-lg">
				<span className="font-bold">Фильтры</span>
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
						setFilters({
							...filters,
							sortBy: e.target.value as "asc" | "desc",
						});
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
					checked={filters.onlyAvailable}
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
			{phones
				.filter(
					(phone) =>
						phone.priceBYN / 100 <= filters.maxPrice &&
						(filters.onlyAvailable ? phone.available_quantity > 0 : true) &&
						(phone.model
							.toLowerCase()
							.includes(filters.searchQuery.toLowerCase()) ||
							phone.manufacturer
								.toLowerCase()
								.includes(filters.searchQuery.toLowerCase())),
				)
				.toSorted(({ priceBYN: aPrice }, { priceBYN: bPrice }) => {
					return filters.sortBy === "asc" ? aPrice - bPrice : bPrice - aPrice;
				})
				.map((phone) => (
					<PhoneCard key={phone.id} phone={phone} />
				))}
		</div>
	);
}
