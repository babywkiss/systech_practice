export default function PagesBar({
	totalPages,
	page,
	setPage,
}: { totalPages: number; page: number; setPage: (page: number) => void }) {
	const range = generateRange(page, totalPages);

	return (
		<div className="flex justify-center pt-3 w-full">
			<div className="join">
				<button
					disabled={page === 0}
					onClick={() => {
						setPage(0);
					}}
					className="join-item btn"
				>
					«
				</button>
				{range.map((p, i) => (
					<button
						className={`join-item btn ${p === page ? "btn-primary" : ""}`}
						key={i}
						onClick={() => {
							setPage(p);
						}}
					>
						{p + 1}
					</button>
				))}
				<button
					disabled={page === totalPages - 1}
					onClick={() => {
						setPage(totalPages - 1);
					}}
					className="join-item btn"
				>
					»
				</button>
			</div>
		</div>
	);
}

const MAX_SIZE = 5;

const generateRange = (page: number, totalPages: number) => {
	let left = page;
	let right = page;

	while (true) {
		let prev = right - left;
		if (right < totalPages && right - left <= MAX_SIZE - 1) right++;
		if (left > 0 && right - left <= MAX_SIZE - 1) left--;
		if (prev === right - left) break;
	}

	return Array.from({ length: right - left }, (_, i) => left + i);
};
