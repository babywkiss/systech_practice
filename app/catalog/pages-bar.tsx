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
				{range.map((p) => (
					<button
						className={`join-item btn ${p === page ? "btn-primary" : ""}`}
						key={p}
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

const MAX_OFFSET = 3;

const generateRange = (page: number, totalPages: number) =>
	Array.from(
		{ length: MAX_OFFSET * 2 },
		(_, i) => page - MAX_OFFSET + i,
	).filter((p) => p >= 0 && p < totalPages);
