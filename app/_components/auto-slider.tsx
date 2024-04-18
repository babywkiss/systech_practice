"use client";

import { useEffect, useRef } from "react";

export default function AutoSlider({
	children,
	...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
	const carouselRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel) return;
		const numSlides = carousel.children.length;
		let slide = 0;
		const interval = setInterval(() => {
			if (slide >= carousel.scrollWidth) {
				slide = 0;
			} else {
				slide += carousel.scrollWidth / numSlides;
			}
			carousel.scrollLeft = slide;
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div ref={carouselRef} {...props}>
			{children}
		</div>
	);
}
