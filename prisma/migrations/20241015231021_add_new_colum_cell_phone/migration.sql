/*
  Warnings:

  - A unique constraint covering the columns `[cellPhone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cellPhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `cellPhone` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cellPhone_key` ON `User`(`cellPhone`);
