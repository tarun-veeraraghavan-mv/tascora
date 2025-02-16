-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseDesc" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grade" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "proffessorName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "progress" TEXT NOT NULL DEFAULT 'Not started',
ADD COLUMN     "semesterColor" TEXT NOT NULL DEFAULT '#fff',
ADD COLUMN     "semesterNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "difficulty" SET DEFAULT 'easy';
