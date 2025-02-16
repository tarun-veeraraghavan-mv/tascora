-- DropForeignKey
ALTER TABLE "ExpenseTracker" DROP CONSTRAINT "ExpenseTracker_userId_fkey";

-- AddForeignKey
ALTER TABLE "ExpenseTracker" ADD CONSTRAINT "ExpenseTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
