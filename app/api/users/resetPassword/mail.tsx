export default function Mail({
	token,
	baseUrl,
}: { token: string; baseUrl: string }) {
	const url = new URL(`${baseUrl}/resetPassword/confirm`);
	url.searchParams.append("token", token);

	return (
		<>
			<h1>Перейдите по ссылке чтобы указать новый пароль</h1>
			<h3>Phone-Shop</h3>
			<p>Данная ссылка действительная в течении 10 минут</p>
			<a href={url.toString()}>Восстановить пароль</a>
		</>
	);
}
