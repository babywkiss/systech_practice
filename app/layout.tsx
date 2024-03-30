import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import dynamic from "next/dynamic";

const StoreProvider = dynamic(() => import("./store/storeProvider"), {
	ssr: false,
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex flex-col">
				<StoreProvider>
					<Header />
					<main className="flex overflow-auto flex-col p-3 w-full h-full bg-white">
						{children}
					</main>
					<Footer />
				</StoreProvider>
			</body>
		</html>
	);
}
