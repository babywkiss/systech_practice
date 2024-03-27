/*
  Warnings:

  - Added the required column `imageLink` to the `Phone` table without a default value. This is not possible if the table is not empty.

*/
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
    "ramGB" INTEGER NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "Phone_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Phone" ("available_quantity", "cpu", "description", "id", "manufacturer", "model", "orderId", "priceBYN", "ramGB", "releaseYear", "screenSizeInches") SELECT "available_quantity", "cpu", "description", "id", "manufacturer", "model", "orderId", "priceBYN", "ramGB", "releaseYear", "screenSizeInches" FROM "Phone";
DROP TABLE "Phone";
ALTER TABLE "new_Phone" RENAME TO "Phone";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
