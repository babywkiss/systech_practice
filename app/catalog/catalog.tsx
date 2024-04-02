"use client";

import { Phone } from "@prisma/client";
import PhoneCard from "./phone-card";
import { useMemo, useRef, useState } from "react";
import { IconSearch } from "@tabler/icons-react";

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
		<>
			<label className="flex gap-2 items-center input input-bordered">
				<input
					onInput={(e) => {
						setFilters({
							...filters,
							searchQuery: (e.target as HTMLInputElement).value,
						});
					}}
					type="text"
					className="grow"
					placeholder="Поиск по названию"
				/>
				<IconSearch size="1rem" />
			</label>
			<label className="form-control">
				<div className="label">
					<span className="label-text">Сортировать по</span>
				</div>
				<select
					className="select"
					onChange={(e) => {
						setIsSortAsc(e.target.value === "asc");
					}}
					defaultValue={"asc"}
				>
					<option value="asc">По возрастанию цены</option>
					<option value="desc">По убыванию цены</option>
				</select>
			</label>
			<div className="form-control">
				<label className="cursor-pointer label">
					<span className="label-text">Показывать только в наличии</span>
					<input
						onInput={() => {
							setFilters({
								...filters,
								onlyAvailable: !filters.onlyAvailable,
							});
						}}
						defaultChecked={filters.onlyAvailable}
						type="checkbox"
						className="checkbox"
					/>
				</label>
			</div>
			<label className="form-control">
				<div className="label">
					<span className="label-text">Максимальная цена</span>
				</div>
				<input
					className="range"
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
				<div className="flex justify-between">
					<span className="label-text">0</span>
					<span className="label-text">{filters.maxPrice}</span>
				</div>
			</label>
		</>
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
	const itemList = useRef<HTMLDivElement>(null);

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

	const pagesCount =
		Math.floor(filteredPhones.length / ITEMS_PER_PAGE) +
		Number(filteredPhones.length % ITEMS_PER_PAGE !== 0);
	const pagesRange = [page - 2, page - 1, page, page + 1, page + 2].filter(
		(p) => p >= 0 && p < pagesCount,
	);

	return (
		<div className="flex flex-col gap-3 h-full md:flex-row shrink-0">
			<div className="md:w-1/4 collapse bg-base-200 md:collapse-open">
				<input type="checkbox" />
				<div className="text-xl font-medium collapse-title">Фильтры</div>
				<div className="flex flex-col gap-3 collapse-content">
					<CatalogOptions
						filters={filters}
						setFilters={(filters) => {
							setFilters(filters);
							setPage(0);
							itemList.current?.scrollTo(0, 0);
						}}
						setIsSortAsc={setIsSortAsc}
					/>
				</div>
			</div>
			<div className="flex overflow-auto flex-col flex-1">
				<div
					ref={itemList}
					className="flex overflow-auto flex-col flex-1 gap-1 items-center md:flex-row md:flex-wrap md:justify-center"
				>
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
						<span className="text-2xl font-bold text-neutral-500">
							Товары не найдены
						</span>
					)}
				</div>

				<div className="flex justify-center pt-3 w-full">
					<div className="join">
						<button
							disabled={page === 0}
							onClick={() => {
								setPage(0);
								itemList.current?.scrollTo(0, 0);
							}}
							className="join-item btn"
						>
							«
						</button>
						{pagesRange.map((p) => (
							<button
								className={`join-item btn ${p === page ? "btn-primary" : ""}`}
								key={p}
								onClick={() => {
									setPage(p);
									itemList.current?.scrollTo(0, 0);
								}}
							>
								{p + 1}
							</button>
						))}
						<button
							disabled={page === pagesCount - 1}
							onClick={() => {
								setPage(pagesCount - 1);
								itemList.current?.scrollTo(0, 0);
							}}
							className="join-item btn"
						>
							»
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
