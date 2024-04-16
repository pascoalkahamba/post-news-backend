/*
  Warnings:

  - Made the column `bio` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `bio` VARCHAR(191) NOT NULL;
