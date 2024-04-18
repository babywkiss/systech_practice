"use client";

import { Phone, User } from "@prisma/client";
import CreatePhoneButton from "@/components/admin/createPhoneButton";
import PagesBar from "./pages-bar";
import OptionsPanel, { Filters } from "./options-panel";
import { useLayoutEffect, useRef, useState } from "react";
import PhoneCard from "./phone-card";
import { useUnmount } from "../hooks";
import DeletePhoneModal from "../_components/delete-phone-modal";
import EditPhoneModal from "../_components/edit-phone-modal";

const ITEMS_PER_PAGE = 9;

const searchQueryFilter = (phone: Phone, query: string) =>
	`${phone.manufacturer}${phone.model}`
		.toLowerCase()
		.includes(query.toLowerCase().replaceAll(" ", ""));

const filterPhones = (phones: Phone[], filters: Filters) =>
	phones.filter(
		(phone) =>
			phone.priceBYN / 100 <= filters.maxPrice &&
			(filters.onlyAvailable ? phone.available_quantity > 0 : true) &&
			searchQueryFilter(phone, filters.searchQuery),
	);

const sortPhones = (phones: Phone[], isSortAsc: boolean) =>
	phones.toSorted(({ priceBYN: aPrice }, { priceBYN: bPrice }) => {
		return isSortAsc ? aPrice - bPrice : bPrice - aPrice;
	});

const paginatePhones = (phones: Phone[], page: number) =>
	phones.slice(ITEMS_PER_PAGE * page, ITEMS_PER_PAGE * page + ITEMS_PER_PAGE);

const memory = {
	page: 0,
	filters: {
		searchQuery: "",
		maxPrice: 7000,
		onlyAvailable: false,
	},
	isSortAsc: true,
	scroll: 0,
};

export default function Catalog({
	phones,
	user,
}: { phones: Phone[]; user: User | null }) {
	// restore state from memory
	const [page, setPage] = useState(memory.page);
	const [filters, setFilters] = useState(memory.filters);
	const [isSortAsc, setIsSortAsc] = useState(memory.isSortAsc);

	useLayoutEffect(() => {
		// set scroll on mount
		const list = listRef.current;
		if (!list) return;
		list.scrollTop = memory.scroll;
		// save scroll on unmount
		return () => {
			memory.scroll = list.scrollTop;
		};
	}, []);

	// save state in memory
	useUnmount(() => {
		memory.page = page;
		memory.filters = filters;
		memory.isSortAsc = isSortAsc;
	});

	const showingPhones = sortPhones(filterPhones(phones, filters), isSortAsc);
	const totalPages =
		Math.floor(showingPhones.length / ITEMS_PER_PAGE) +
		Number(showingPhones.length % ITEMS_PER_PAGE !== 0);
	const paginatedPhones = paginatePhones(showingPhones, page);

	const listRef = useRef<HTMLDivElement>(null);
	const scrollTop = () =>
		listRef.current?.scrollTo({ top: 0, behavior: "smooth" });

	// modals
	const [phoneToDelete, setPhoneToDelete] = useState<Phone>();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [phoneToEdit, setPhoneToEdit] = useState<Phone>();
	const [editPhoneModalOpen, setEditPhoneModalOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col gap-3 h-full md:flex-row shrink-0">
				<div className="flex flex-col gap-3 md:w-2/5 md:h-full lg:w-1/4">
					{user?.isAdmin === true && <CreatePhoneButton />}
					<div className="w-full h-full collapse bg-base-200 max-md:collapse-arrow md:collapse-open">
						<input type="checkbox" />
						<div className="text-xl font-medium collapse-title">Фильтры</div>
						<div className="flex flex-col gap-3 collapse-content">
							<OptionsPanel
								isSortAsc={isSortAsc}
								filters={filters}
								setFilters={(filters) => {
									setFilters(filters);
									setPage(0);
									scrollTop();
								}}
								setIsSortAsc={setIsSortAsc}
							/>
						</div>
					</div>
				</div>
				<div className="flex overflow-auto flex-col flex-1">
					<div
						ref={listRef}
						className="flex overflow-auto flex-col flex-1 gap-1 items-center rounded-lg md:flex-row md:flex-wrap md:justify-center"
					>
						{paginatedPhones.length > 0 ? (
							paginatedPhones.map((phone) => (
								<PhoneCard
									key={phone.id}
									phone={phone}
									user={user}
									onDelete={() => {
										setPhoneToDelete(phone);
										setDeleteModalOpen(true);
									}}
									onEdit={() => {
										setPhoneToEdit(phone);
										setEditPhoneModalOpen(true);
									}}
								/>
							))
						) : (
							<div className="flex justify-center items-center w-full h-full">
								<span className="text-2xl font-bold text-neutral-500">
									Товары не найдены
								</span>
							</div>
						)}
					</div>
					<PagesBar
						page={page}
						totalPages={totalPages}
						setPage={(page) => {
							setPage(page);
							scrollTop();
						}}
					/>
				</div>
			</div>

			{phoneToDelete && (
				<DeletePhoneModal
					phone={phoneToDelete}
					isOpen={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
				/>
			)}

			{phoneToEdit && (
				<EditPhoneModal
					phone={phoneToEdit}
					setPhone={setPhoneToEdit}
					isOpen={editPhoneModalOpen}
					onClose={() => setEditPhoneModalOpen(false)}
				/>
			)}
		</>
	);
}
