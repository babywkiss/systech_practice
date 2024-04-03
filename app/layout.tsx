import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import getUser from "./api/getUser";
import AuthProvier from "./authProvider";

const StoreProvider = dynamic(() => import("./store/storeProvider"), {
	ssr: false,
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUser();
	return (
		<html lang="en">
			<body className="flex flex-col">
				<Toaster />
				<StoreProvider>
					<AuthProvier user={user}>
						<Header />
						{user?.isAdmin && (
							<div className="px-3 text-sm font-bold text-black bg-warning">
								Администратор
							</div>
						)}
						<main className="flex overflow-auto flex-col p-5 w-full h-full bg-base-300">
							{children}
						</main>
						<Footer />
					</AuthProvier>
				</StoreProvider>
			</body>
		</html>
	);
}
