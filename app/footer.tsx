import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex justify-center items-center p-3 footer">
			<p>Разработано: </p>
			<Link
				href="https://github.com/nicejji"
				className="items-center btn btn-xs"
			>
				Maksim Kozhukh
			</Link>
		</footer>
	);
}
