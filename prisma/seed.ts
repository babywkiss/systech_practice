import { Prisma } from "@prisma/client";
import prisma from "./client";
import bcrypt from "bcrypt";

const randIntInRange = (min: number, max: number) => {
	return Math.floor(min + Math.random() * (max - min));
};

const randChoice = <T>(items: T[]): T => {
	return items[randIntInRange(0, items.length - 1)];
};

const randLetter = () =>
	String.fromCharCode(randIntInRange("A".charCodeAt(0), "Z".charCodeAt(0)));

const dummyModelLikeString = () =>
	`${Array.from({ length: 2 }, () => randLetter()).join("")}${randIntInRange(
		10,
		99,
	)}`;

const MANUFACTURERS = ["Apple", "Samsung", "Xiaomi", "Lenovo", "LG"];
const IMAGES = [
	"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202111/Pixel_6_0.png?size=690:388",
	"https://t4.ftcdn.net/jpg/05/36/24/13/360_F_536241340_GsrsNhcWC0hyTVaJLilNafyDw6fl0cC8.jpg",
	"https://5.imimg.com/data5/MT/ZV/GR/SELLER-79548254/random-r1-pro.jpg",
	"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818",
];

const createRandomPhone = (): Prisma.PhoneCreateInput => {
	const manufacturer = randChoice(MANUFACTURERS);
	return {
		imageLink: randChoice(IMAGES),
		releaseYear: randIntInRange(2013, 2024),
		available_quantity: randIntInRange(0, 5),
		manufacturer,
		model: dummyModelLikeString(),
		priceBYN: randIntInRange(300 * 100, 3000 * 100),
		description: Array.from({ length: randIntInRange(0, 300) }, () =>
			randLetter(),
		).join(""),
		screenSizeInches: randIntInRange(4, 8),
		cpu: `${manufacturer} ${dummyModelLikeString()}`,
		ramGB: randIntInRange(3, 10),
	};
};

async function main() {
	// Create root admin
	if (!process.env.SUPER_ADMIN_EMAIL) throw "Provide super admin email in .env";
	if (!process.env.SUPER_ADMIN_PASSWORD)
		throw "Provide super admin password in .env";
	await prisma.user.create({
		data: {
			email: process.env.SUPER_ADMIN_EMAIL,
			passwordHash: await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10),
			isAdmin: true,
			isSuperAdmin: true,
		},
	});
	const promoLinks = [
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F75%2FCute_grey_kitten.jpg&f=1&nofb=1&ipt=dd50fb436cdb44d482b45475c03f4a4a5c33e6f91bfb36abaa266e08f799a42c&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.itl.cat%2Fpngfile%2Fbig%2F206-2063899_cute-kitten-images-hd.jpg&f=1&nofb=1&ipt=fc3197f023316bd66d0f9a75332559d6b103faffea55a97c95e33995886f450d&ipo=images",
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9b%2FPhoto_of_a_kitten.jpg&f=1&nofb=1&ipt=34710762570cc5c3e67e5b4935cfcd3797d5e9c4634708d4e47419b4344ce30a&ipo=images",
	];
	for (let i = 0; i < 150; i++) {
		await prisma.phone.create({ data: createRandomPhone() });
	}
	await Promise.all(
		promoLinks.map((link) =>
			prisma.promo.create({ data: { imageLink: link } }),
		),
	);
}

const isSeed = false;
if (isSeed) {
	main()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
}
