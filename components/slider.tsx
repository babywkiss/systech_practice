"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Slider({ items }: { items: React.ReactNode[] }) {
	const [index, setIndex] = useState(0);
	const [isAuto, setIsAuto] = useState(true);
	const [_, setManualViewTimeout] = useState<null | ReturnType<
		typeof setTimeout
	>>(null);

	const moveNext = () => {
		setIndex((prevIndex) =>
			prevIndex >= items.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const movePrev = () => {
		setIndex((prevIndex) =>
			prevIndex <= 0 ? items.length - 1 : prevIndex - 1,
		);
	};

	const suspendAuto = () => {
		setManualViewTimeout((prevTimeout) => {
			if (prevTimeout !== null) clearTimeout(prevTimeout);
			setIsAuto(false);
			return setTimeout(() => {
				setIsAuto(true);
			}, 5000);
		});
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isAuto) moveNext();
		}, 2000);
		return () => clearInterval(interval);
	}, [isAuto]);

	return (
		<div className="relative group/controls">
			<div className="transition-opacity md:opacity-0 group-hover/controls:opacity-100">
				<button
					onClick={() => {
						suspendAuto();
						movePrev();
					}}
					className="absolute left-0 top-1/2 -translate-y-1/2 btn btn-outline"
				>
					<IconArrowLeft className="text-blue-500" />
				</button>
				<button
					onClick={() => {
						suspendAuto();
						moveNext();
					}}
					className="absolute right-0 top-1/2 -translate-y-1/2 btn btn-outline"
				>
					<IconArrowRight className="text-blue-500" />
				</button>
			</div>
			<div className="flex absolute bottom-0 left-1/2 gap-3 justify-center -translate-x-1/2">
				{items.map((_, i) => (
					<button
						className={`w-4 h-4 btn ${
							i === index ? "btn-filled" : "btn-outline"
						}`}
						onClick={() => {
							suspendAuto();
							setIndex(i);
						}}
						key={i}
					></button>
				))}
			</div>

			{items[index] ?? null}
		</div>
	);
}
