-- DropIndex
DROP INDEX "FileUpload_courseId_key";

-- AlterTable
ALTER TABLE "FileUpload" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id");
