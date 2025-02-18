import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import TaskDashboardGraph from "@/components/dashboard/TaskDashboardGraph";
import Container from "@/components/ui/Container";
import { getCourseForUser, getTasks } from "@/lib/actions/auth";
import { getUser } from "@/lib/utils/getUser";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Link from "next/link";
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
        <DashboardHeader user={user} />

        <Divider />

        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardHeader className="bg-blue-200">
              <h2 className="text-bold text-md font-bold">
                Top 5 active courses
              </h2>
            </CardHeader>
            {courses
              .filter((course) => course.progress === "In progress")
              .slice(0.5)
              .map((course) => (
                <>
                  <CardBody key={course.id}>{course.name}</CardBody>
                  <Divider />
                </>
              ))}
            <CardBody>
              <Link href="/main/courses">
                <Button>View all your courses &rarr;</Button>
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="bg-pink-200">
              <h2 className="text-bold text-md font-bold">
                Top 5 active tasks
              </h2>
            </CardHeader>
            {tasks.filter((task) => task.priority === "High").slice(0, 5)
              .length > 0 ? (
              tasks
                .filter((task) => task.priority === "High")
                .slice(0, 5)
                .map((course) => (
                  <>
                    <CardBody key={course.id}>{course.name}</CardBody>
                    <Divider />
                  </>
                ))
            ) : (
              <>
                <CardBody>No any active todos</CardBody>
                <Divider />
              </>
            )}
            <CardBody>
              <Link href="/main/todos">
                <Button>View all your todos &rarr;</Button>
              </Link>
            </CardBody>
          </Card>
        </div>

        {/* <div>
          <h2 className="text-xl font-bold">Tasks with high priority</h2>
          {highPriorityTask.length > 0 ? (
            highPriorityTask.map((task) => <p key={task.id}>{task.name}</p>)
          ) : (
            <p>No high priority tasks right now!</p>
          )}
        </div> */}
      </div>
    </Container>
  );
}
