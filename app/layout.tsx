import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "./header";
import Footer from "./footer";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { extractUser } from "./api/auth";

const rubik = Rubik({
	subsets: ["latin", "cyrillic"],
	variable: "--font-rubik",
});

const StoreProvider = dynamic(() => import("./store/store-provider"), {
	ssr: false,
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await extractUser();
	return (
		<html lang="en" className={`${rubik.variable}`}>
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
