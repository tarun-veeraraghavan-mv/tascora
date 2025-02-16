import { getTasks } from "@/lib/actions/auth";
import { getAllCourses } from "@/lib/utils/getAllCourses";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import TodoItem from "./TodoItem";
import TodoItemSkeleton from "./TodoItemSkeleton";
import Container from "@/components/ui/Container";
import { Divider } from "@heroui/react";

export default async function page() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const courses = await getAllCourses(user.id);
  const tasks = await getTasks(user.id);

  console.log(tasks);

  return (
    <Container>
      <div className="py-4">
        <h2 className="text-3xl font-bold">All of your todos</h2>
      </div>

      <Divider />

      <Suspense fallback={<TodoItemSkeleton />}>
        {new Promise((res) => setTimeout(res, 2000))}
        <ul className="grid grid-cols-3 gap-3 py-4">
          {courses.map((course) => (
            <TodoItem
              key={course.id}
              course={course}
              user={user}
              tasks={tasks}
            />
          ))}
        </ul>
      </Suspense>
    </Container>
  );
}
