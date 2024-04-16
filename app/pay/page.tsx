import Link from "next/link";
import { extractUser } from "../api/auth";
import StripeProvider from "../stripeProvider";
import CheckoutTotal from "./checkoutTotal";
import PayWidget from "./payWidget";

export default async function PayPage() {
	const user = await extractUser();
	if (!user)
		return (
			<div className="flex flex-col gap-3 justify-center items-center w-full h-full">
				<span>Авторизуйтесь, чтобы продолжить</span>
				<Link href="/login" className="btn btn-primary md:w-fit">
					Войти в аккаунт
				</Link>
			</div>
		);

	return (
		<StripeProvider>
			<div className="flex flex-col gap-3 justify-center items-center w-full h-full md:flex-row">
				<CheckoutTotal />
				<PayWidget />
			</div>
		</StripeProvider>
	);
}
