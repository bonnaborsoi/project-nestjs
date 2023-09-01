-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PurchasedProducts" (
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "purchaseId" TEXT NOT NULL,

    PRIMARY KEY ("productId", "purchaseId"),
    CONSTRAINT "PurchasedProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PurchasedProducts_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchases" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" TEXT NOT NULL PRIMARY KEY
);
