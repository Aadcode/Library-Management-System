/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorpassword` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `haveaccess` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userpassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "authorpassword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "haveaccess" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "userpassword" TEXT NOT NULL;
