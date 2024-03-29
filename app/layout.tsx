import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import { StoreProvider } from "./store/storeProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className="flex flex-col">
					<Header />
					<main className="flex overflow-auto flex-col p-3 w-full h-full bg-white">
						{children}
					</main>
					<Footer />
				</body>
			</html>
		</StoreProvider>
	);
}
