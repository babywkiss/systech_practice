"use client";

import { useEffect, useState } from "react";

export default function Slider({ items }: { items: React.ReactNode[] }) {
	const [index, setIndex] = useState(0);
	const [isAuto, setIsAuto] = useState(true);
	const [manualViewTimeout, setManualViewTimeout] = useState<null | ReturnType<
		typeof setTimeout
	>>(null);
	useEffect(() => {
		const interval = setInterval(() => {
			if (isAuto)
				setIndex((prevIndex) =>
					prevIndex >= items.length - 1 ? 0 : prevIndex + 1,
				);
		}, 2000);
		return () => clearInterval(interval);
	}, [items, isAuto]);
	return (
		<div className="flex flex-col gap-2 shrink-0">
			{items[index] ?? null}
			<div className="flex gap-3 justify-center w-full">
				{items.map((_, i) => (
					<button
						className={`w-4 h-4 btn ${
							i === index ? "btn-filled" : "btn-outline"
						}`}
						onClick={() => {
							if (manualViewTimeout !== null) clearTimeout(manualViewTimeout);
							setIsAuto(false);
							setIndex(i);
							const timeout = setTimeout(() => {
								setIsAuto(true);
							}, 5000);
							setManualViewTimeout(timeout);
						}}
						key={i}
					></button>
				))}
			</div>
		</div>
	);
}
