/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "userid" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userid");

-- CreateTable
CREATE TABLE "Author" (
    "authorid" SERIAL NOT NULL,
    "authorname" TEXT NOT NULL,
    "authoremail" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("authorid")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rentalprice" DOUBLE PRECISION NOT NULL,
    "sellingprice" DOUBLE PRECISION NOT NULL,
    "authorAuthorid" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookid")
);

-- CreateTable
CREATE TABLE "Rental" (
    "rentalid" SERIAL NOT NULL,
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,
    "userUserid" INTEGER NOT NULL,
    "bookBookid" INTEGER NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("rentalid")
);

-- CreateTable
CREATE TABLE "Purchased" (
    "purchasedid" SERIAL NOT NULL,
    "purchasedate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUserid" INTEGER NOT NULL,
    "bookBookid" INTEGER NOT NULL,

    CONSTRAINT "Purchased_pkey" PRIMARY KEY ("purchasedid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_authoremail_key" ON "Author"("authoremail");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorAuthorid_fkey" FOREIGN KEY ("authorAuthorid") REFERENCES "Author"("authorid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_userUserid_fkey" FOREIGN KEY ("userUserid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_bookBookid_fkey" FOREIGN KEY ("bookBookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchased" ADD CONSTRAINT "Purchased_userUserid_fkey" FOREIGN KEY ("userUserid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchased" ADD CONSTRAINT "Purchased_bookBookid_fkey" FOREIGN KEY ("bookBookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;
