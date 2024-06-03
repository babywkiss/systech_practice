"use client";

import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OptionsPanel() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const setParam = (key: string, value: unknown) => {
		const params = new URLSearchParams(searchParams);
		params.set(key, value?.toString() ?? "");
		params.set("page", "0");
		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<>
			<label className="flex gap-2 items-center input input-bordered">
				<input
					onInput={(e) => {
						setParam("query", (e.target as HTMLInputElement).value);
					}}
					defaultValue={searchParams.get("query")?.toString()}
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
						setParam("sort", e.target.value);
					}}
					defaultValue={searchParams.get("sort") ?? "asc"}
				>
					<option value="asc">По возрастанию цены</option>
					<option value="desc">По убыванию цены</option>
				</select>
			</label>
			<div className="form-control">
				<label className="cursor-pointer label">
					<span className="label-text">Показывать только в наличии</span>
					<input
						onInput={(e) => {
							setParam("onlyInStock", (e.target as HTMLInputElement).checked);
						}}
						defaultChecked={!!searchParams.get("onlyInStock")}
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
						setParam(
							"maxPrice",
							Number((e.target as HTMLInputElement).value) * 100,
						);
					}}
					defaultValue={7000}
					min="0"
					max="7000"
					step="100"
					type="range"
				/>
				<div className="flex justify-between">
					<span className="label-text">0</span>
					<span className="label-text">
						{Number(searchParams.get("maxPrice")?.toString() ?? 7000 * 100) /
							100}
					</span>
				</div>
			</label>
		</>
	);
}
