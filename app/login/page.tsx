import Link from "next/link";
import LoginForm from "./login-form";

export default function AuthPage() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center w-full h-full">
			<h1 className="text-2xl font-bold text-primary">Вход в аккаунт</h1>
			<LoginForm />
			<Link className="link link-primary" href="/signup">
				У меня нет аккаунта
			</Link>
		</div>
	);
}
