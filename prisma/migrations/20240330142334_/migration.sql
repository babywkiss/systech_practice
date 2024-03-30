/*
  Warnings:

  - You are about to drop the column `orderId` on the `Phone` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_OrderToPhone" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OrderToPhone_A_fkey" FOREIGN KEY ("A") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrderToPhone_B_fkey" FOREIGN KEY ("B") REFERENCES "Phone" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "available_quantity" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "priceBYN" INTEGER NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "screenSizeInches" INTEGER NOT NULL,
    "cpu" TEXT NOT NULL,
    "ramGB" INTEGER NOT NULL
);
INSERT INTO "new_Phone" ("available_quantity", "cpu", "description", "id", "imageLink", "manufacturer", "model", "priceBYN", "ramGB", "releaseYear", "screenSizeInches") SELECT "available_quantity", "cpu", "description", "id", "imageLink", "manufacturer", "model", "priceBYN", "ramGB", "releaseYear", "screenSizeInches" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToPhone_AB_unique" ON "_OrderToPhone"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToPhone_B_index" ON "_OrderToPhone"("B");
