import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Container from "@/components/ui/Container";
import { getCourseForUser, getTasks } from "@/lib/actions/auth";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const [courses, tasks] = await Promise.all([
    getCourseForUser(user?.id),
    getTasks(user.id),
  ]);

  return (
    <Container>
      <div>This is a dashboard page</div>
      <DashboardHeader courses={courses} />
    </Container>
  );
}
