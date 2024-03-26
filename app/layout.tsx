import "./globals.css";
import Header from "./header";
import Footer from "./footer";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex flex-col">
				<Header />
				<main className="flex overflow-auto flex-col p-3 w-full h-full bg-white">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
