import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

const StoreProvider = dynamic(() => import("./store/storeProvider"), {
	ssr: false,
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex flex-col">
				<Toaster />
				<StoreProvider>
					<Header />
					<main className="flex overflow-auto flex-col p-5 w-full h-full bg-base-300">
						{children}
					</main>
					<Footer />
				</StoreProvider>
			</body>
		</html>
	);
}
