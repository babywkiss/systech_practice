import { Prisma } from "@prisma/client";
import prisma from "./client";

async function main() {
	const promoLinks = [
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F75%2FCute_grey_kitten.jpg&f=1&nofb=1&ipt=dd50fb436cdb44d482b45475c03f4a4a5c33e6f91bfb36abaa266e08f799a42c&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.itl.cat%2Fpngfile%2Fbig%2F206-2063899_cute-kitten-images-hd.jpg&f=1&nofb=1&ipt=fc3197f023316bd66d0f9a75332559d6b103faffea55a97c95e33995886f450d&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9b%2FPhoto_of_a_kitten.jpg&f=1&nofb=1&ipt=34710762570cc5c3e67e5b4935cfcd3797d5e9c4634708d4e47419b4344ce30a&ipo=images",
	];
	const phones: Prisma.PhoneCreateInput[] = [
		{
			imageLink:
				"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.pocketlintimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2023%2F09%2Fapple-iphone-15-pro-square-tag.jpg&f=1&nofb=1&ipt=0ac7fa1308b7df3834fb4d384f9c936042b68c7ed0fc31442174d46a7beaf829&ipo=images",
			available_quantity: 10,
			manufacturer: "Apple",
			model: "Iphone 15",
			priceBYN: 2000 * 100,
			releaseYear: 2023,
			description: "Новейший смартфон от apple",
			screenSizeInches: 6,
			cpu: "Apple A15",
			ramGB: 5,
		},
		{
			imageLink:
				"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcelulandia.com.mx%2Fwp-content%2Fuploads%2F2023%2F05%2FPoco-F5-Negro.png&f=1&nofb=1&ipt=045ac3a0a05cd10f87aa941371774e60d3ff2ef30e414de54d452f1a7d58d02c&ipo=images",
			available_quantity: 3,
			manufacturer: "Xiaomi",
			model: "Poco F5",
			priceBYN: 1300 * 100,
			releaseYear: 2022,
			description: "Гаджет от xiaomi.",
			screenSizeInches: 5,
			cpu: "Snapdragon 880",
			ramGB: 7,
		},
	];
	await Promise.all([
		...phones.map((phone) => prisma.phone.create({ data: phone })),
		...promoLinks.map((link) =>
			prisma.promo.create({ data: { imageLink: link } }),
		),
	]);
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
