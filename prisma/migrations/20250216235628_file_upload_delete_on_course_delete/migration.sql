-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_courseId_fkey";

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
