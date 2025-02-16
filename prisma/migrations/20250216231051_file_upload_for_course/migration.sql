-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "fileUrl" TEXT;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "recieptImage" DROP NOT NULL;
