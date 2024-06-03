import { z } from "zod";
import CreatePhoneButton from "../_components/create-phone-button";
import { extractUser } from "../api/auth";
import OptionsPanel from "./options-panel";
import PagesBar from "./pages-bar";
import PhonesList from "./phones-list";
import { Suspense } from "react";

const paramsSchema = z.object({
	query: z.string().catch(""),
	sort: z.enum(["asc", "desc"]).catch("asc"),
	page: z.coerce.number().min(0).catch(0),
	onlyInStock: z.coerce.boolean().catch(false),
	maxPrice: z.coerce
		.number()
		.min(0)
		.max(7000 * 100)
		.catch(7000 * 100),
});

export type Params = z.infer<typeof paramsSchema>;

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) {
	const user = await extractUser();
	const catalogOptions = paramsSchema.parse(searchParams);

	return (
		<div className="flex flex-col gap-3 h-full md:flex-row shrink-0">
			<div className="flex flex-col gap-3 md:w-2/5 md:h-full lg:w-1/4">
				{user?.isAdmin === true && <CreatePhoneButton />}
				<div className="w-full h-full collapse bg-base-200 max-md:collapse-arrow md:collapse-open">
					<input type="checkbox" />
					<div className="text-xl font-medium collapse-title">Фильтры</div>
					<div className="flex flex-col gap-3 collapse-content">
						<OptionsPanel />
					</div>
				</div>
			</div>
			<div className="flex overflow-auto flex-col flex-1">
				<Suspense
					key={JSON.stringify(catalogOptions)}
					fallback={
						<div className="flex flex-1 justify-center items-center">
							<span className="loading loading-spinner loading-lg"></span>
						</div>
					}
				>
					<PhonesList options={catalogOptions} />
				</Suspense>
				<PagesBar
					totalPages={z.coerce.number().catch(0).parse(searchParams?.total)}
				/>
			</div>
		</div>
	);
}
