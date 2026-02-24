-- AlterTable
ALTER TABLE `Comment` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Reply` MODIFY `content` LONGTEXT NOT NULL;
