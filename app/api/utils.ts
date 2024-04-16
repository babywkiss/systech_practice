export const errorResponse = (message: string, status: number) => {
	return Response.json(
		{
			error: {
				message,
			},
		},
		{ status },
	);
};

export const tryOrNull = async <T>(promise: Promise<T>) => {
	try {
		return await promise;
	} catch {
		return null;
	}
};
