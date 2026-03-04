/*
  Warnings:

  - You are about to drop the column `likeableId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `likeableType` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,replyId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Like_userId_likeableId_likeableType_key` ON `Like`;

-- AlterTable
ALTER TABLE `Like` DROP COLUMN `likeableId`,
    DROP COLUMN `likeableType`;

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_postId_key` ON `Like`(`userId`, `postId`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_commentId_key` ON `Like`(`userId`, `commentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Like_userId_replyId_key` ON `Like`(`userId`, `replyId`);
