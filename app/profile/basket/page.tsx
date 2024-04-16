import BasketHeader from "./basket-header";
import BasketList from "./basket-list";

export default function BasketPage() {
	return (
		<div className="flex flex-col gap-5 w-full h-full">
			<BasketHeader />
			<div className="overflow-auto h-full">
				<BasketList />
			</div>
		</div>
	);
}
