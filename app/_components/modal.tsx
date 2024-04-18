import { useEffect, useRef } from "react";

export default function Modal({
	isOpen,
	onClose,
	children,
	actions,
}: {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	actions?: React.ReactNode;
}) {
	const ref = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		if (isOpen) {
			ref?.current?.showModal();
		} else {
			ref?.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={ref} className={`modal ${isOpen ? "" : "invisible"}`}>
			<div className="modal-box">
				{children}
				<div className="modal-action">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onClose();
						}}
						method="dialog"
						className="flex gap-2 items-center"
					>
						{actions}
					</form>
				</div>
			</div>
		</dialog>
	);
}
