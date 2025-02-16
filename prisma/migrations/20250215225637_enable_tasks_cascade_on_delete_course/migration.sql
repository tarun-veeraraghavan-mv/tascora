-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
