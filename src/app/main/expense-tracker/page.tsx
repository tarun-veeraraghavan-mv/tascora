import ExpenseTracker from "@/components/expense-tracker/ExpenseTracker";
import ExpenseTrackerForm from "@/components/expense-tracker/ExpenseTrackerForm";
import Container from "@/components/ui/Container";
import { getExpenses, getUserExpenseForm } from "@/lib/actions/auth";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }
  const form = await getUserExpenseForm(user?.id);

  if (!user) {
    redirect("/login");
  }

  const expenses = await getExpenses();

  return (
    <Container>
      {!form ? (
        <ExpenseTrackerForm user={user} />
      ) : (
        <ExpenseTracker form={form} user={user} expenses={expenses} />
      )}
    </Container>
  );
}
