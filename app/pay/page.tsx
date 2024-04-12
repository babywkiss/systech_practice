import getUser from "../api/getUser";
import StripeProvider from "../stripeProvider";
import CheckoutTotal from "./checkoutTotal";
import PayWidget from "./payWidget";

export default async function PayPage() {
	const user = await getUser();
	if (!user) return <span>Авторизуйтесь, чтобы продолжить</span>;

	return (
		<StripeProvider>
			<div className="flex flex-col gap-3 justify-center items-center w-full h-full md:flex-row">
				<CheckoutTotal />
				<PayWidget />
			</div>
		</StripeProvider>
	);
}
