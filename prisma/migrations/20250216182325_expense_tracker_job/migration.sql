-- AlterTable
ALTER TABLE "ExpenseTracker" ADD COLUMN     "currentWage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "haveJob" BOOLEAN NOT NULL DEFAULT false;
