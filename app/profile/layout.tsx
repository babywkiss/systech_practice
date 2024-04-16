import ProfileLayoutMenu from "./profile-layout-menu";

export default function ProfileLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-5 w-full h-full md:flex-row">
			<ProfileLayoutMenu />
			<div className="overflow-auto w-full h-full">{children}</div>
		</div>
	);
}
