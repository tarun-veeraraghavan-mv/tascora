/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "fileUrl";

-- CreateTable
CREATE TABLE "FileUpload" (
    "courseId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FileUpload_courseId_key" ON "FileUpload"("courseId");

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
