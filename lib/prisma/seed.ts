import { AnchorCategory, Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function safeDelete(modelDelete: () => Promise<unknown>) {
	try {
		await modelDelete();
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
			console.warn("⚠️ Table not found, skipping delete.");
		} else {
			throw error;
		}
	}
}

async function main() {
	const DEV_USER_ID = "demo-user-id";
	const DEV_ACCOUNT_ID = "account-123";
	const EMAIL = "test@test.com";

	console.log("🚀 Starting seed...");

	// --- 1️⃣ Cleanup ---
	console.log("清理 Cleaning up existing data...");
	// Order matters due to Foreign Key constraints
	await safeDelete(() => prisma.dailyLog.deleteMany());
	await safeDelete(() => prisma.habitRecipe.deleteMany());

	// --- 2️⃣ Create or upsert user ---
	const user = await prisma.user.upsert({
		where: { id: DEV_USER_ID },
		update: {},
		create: {
			id: DEV_USER_ID,
			name: "Demo User",
			email: EMAIL,
			emailVerified: true,
		},
	});

	// --- 3️⃣ Create or upsert account ---
	await prisma.account.upsert({
		where: { id: DEV_ACCOUNT_ID },
		update: {},
		create: {
			id: DEV_ACCOUNT_ID,
			userId: user.id,
			accountId: EMAIL,
			providerId: "credential",
			password:
				"572915f247a8c5c4be56201a48bad84f:0b983fe1a6c3b51a9207c10d21e02f74606803844806e8d45f39e80ccb7b4529108cdc21b24488ae6a5ce60d61b9a2cf94294e20a50525903c0bd05aa07006ca",
		},
	});

	// --- 4️⃣ Seed Habit Recipes ---
	console.log("🌱 Seeding habits...");

	const habits = [
		{
			anchor: "After I pour my first cup of coffee",
			tinyBehavior: "I will write down my top 3 priorities for the day",
			celebration: "Say 'Today is going to be great!'",
			anchorCategory: AnchorCategory.morning,
		},
		{
			anchor: "After I close my laptop to finish work",
			tinyBehavior: "I will clear one item off my physical desk",
			celebration: "A quick fist pump",
			anchorCategory: AnchorCategory.work,
		},
		{
			anchor: "After I brush my teeth at night",
			tinyBehavior: "I will do one pushup",
			celebration: "Smile in the mirror",
			anchorCategory: AnchorCategory.evening,
		},
	];

	for (const habit of habits) {
		await prisma.habitRecipe.create({
			data: {
				...habit,
				userId: user.id,
			},
		});
	}

	console.log("✅ Seed completed");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
