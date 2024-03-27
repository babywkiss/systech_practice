-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "completed" DATETIME,
    "isCancelled" BOOLEAN NOT NULL DEFAULT false,
    "totalPriceBYN" INTEGER NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "available_quantity" INTEGER NOT NULL,
    "manufacturer" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Promo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageLink" TEXT NOT NULL
);
