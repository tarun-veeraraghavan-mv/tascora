import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TaskDashboardGraph from "@/components/dashboard/TaskDashboardGraph";
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
      <div className="py-4"> 
        <DashboardHeader courses={courses} />
        <TaskDashboardGraph tasks={tasks} />
      </div>
    </Container>
  );
}
