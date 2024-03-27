import prisma from "./client";

async function main() {
	const promoLinks = [
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F75%2FCute_grey_kitten.jpg&f=1&nofb=1&ipt=dd50fb436cdb44d482b45475c03f4a4a5c33e6f91bfb36abaa266e08f799a42c&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.itl.cat%2Fpngfile%2Fbig%2F206-2063899_cute-kitten-images-hd.jpg&f=1&nofb=1&ipt=fc3197f023316bd66d0f9a75332559d6b103faffea55a97c95e33995886f450d&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9b%2FPhoto_of_a_kitten.jpg&f=1&nofb=1&ipt=34710762570cc5c3e67e5b4935cfcd3797d5e9c4634708d4e47419b4344ce30a&ipo=images",
	];
	await Promise.all(
		promoLinks.map((link) =>
			prisma.promo.create({ data: { imageLink: link } }),
		),
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
