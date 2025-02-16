import ExpenseTrackerForm from "@/components/expense-tracker/ExpenseTrackerForm";
import Container from "@/components/ui/Container";
import { getUserExpenseForm } from "@/lib/actions/auth";
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

  return (
    <Container>
      {!form ? <ExpenseTrackerForm user={user} /> : <div>Your stuff</div>}
    </Container>
  );
}
