import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function PhoneControl({
	verbose = false,
	onDelete,
	onEdit,
}: {
	verbose?: boolean;
	onDelete?: () => void;
	onEdit?: () => void;
}) {
	return (
		<div className="flex gap-2 items-center">
			<button
				onClick={() => onDelete?.()}
				className={`btn btn-error ${
					verbose ? "" : "btn-square"
				} btn-sm btn-outline`}
			>
				<IconTrash />
				{verbose && "Удалить"}
			</button>
			<button
				onClick={() => onEdit?.()}
				className={`btn btn-info ${
					verbose ? "" : "btn-square"
				} btn-sm btn-outline`}
			>
				{verbose && "Редактировать"}
				<IconEdit />
			</button>
		</div>
	);
}
