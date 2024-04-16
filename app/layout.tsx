import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { extractUser } from "./api/auth";

const StoreProvider = dynamic(() => import("./store/storeProvider"), {
	ssr: false,
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await extractUser();
	return (
		<html lang="en">
			<body className="flex flex-col">
				<Toaster />
				<StoreProvider>
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
				</StoreProvider>
			</body>
		</html>
	);
}
