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
		<div className="flex flex-col gap-2 shrink-0">
			<div className="flex justify-between items-center">
				<button
					onClick={() => {
						suspendAuto();
						movePrev();
					}}
					className="btn"
				>
					<IconArrowLeft className="text-blue-500" />
				</button>
				{items[index] ?? null}
				<button
					onClick={() => {
						suspendAuto();
						moveNext();
					}}
					className="btn"
				>
					<IconArrowRight className="text-blue-500" />
				</button>
			</div>
			<div className="flex gap-3 justify-center w-full">
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
		</div>
	);
}
