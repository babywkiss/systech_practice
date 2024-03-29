export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex overflow-auto gap-5 w-full h-full bg-white">
			<div className="flex flex-col p-3 h-full bg-blue-200 rounded-lg">
				<span className="text-xl font-bold">Фильтры</span>
			</div>
			{children}
		</main>
	);
}
