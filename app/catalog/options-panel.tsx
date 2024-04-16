import { IconSearch } from "@tabler/icons-react";

export type Filters = {
	searchQuery: string;
	maxPrice: number;
	onlyAvailable: boolean;
};

export default function OptionsPanel({
	isSortAsc,
	filters,
	setFilters,
	setIsSortAsc,
}: {
	isSortAsc: boolean;
	filters: Filters;
	setFilters: (filters: Filters) => void;
	setIsSortAsc: (isSortAsc: boolean) => void;
}) {
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
					value={filters.searchQuery}
					type="text"
					className="grow"
					placeholder="Поиск по названию"
				/>
				<IconSearch size="20" />
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
					defaultValue={isSortAsc ? "asc" : "desc"}
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
}
