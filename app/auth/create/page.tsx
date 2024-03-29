import SignUpForm from "./form";

export default function AuthPage() {
	return (
		<div className="flex flex-col gap-5 justify-center items-center w-full h-full">
			<h1 className="text-2xl font-bold text-blue-500">Создать аккаунт</h1>
			<SignUpForm />
		</div>
	);
}
