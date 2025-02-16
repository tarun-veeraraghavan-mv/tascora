import { createTaskForCourse, getTasks } from "@/lib/actions/auth";
import { getAllCourses } from "@/lib/utils/getAllCourses";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const courses = await getAllCourses(user.id);
  const tasks = await getTasks(user.id);

  console.log(tasks);

  return (
    <div>
      <p>Todos damn page</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <p>{course.name}</p>
            <form action={createTaskForCourse}>
              <div>
                <label>Name of task</label>
                <input type="text" placeholder="Name" name="name" />
              </div>
              <div>
                <label>Due date</label>
                <input type="date" name="dueDate" />
                <input type="hidden" value={user.id} name="userId" />
                <input name="courseId" value={course.id} type="hidden" />
              </div>
              <button>CReate task</button>
            </form>
            {tasks
              .filter((task) => task.courseId === course.id)
              .map((task) => (
                <div key={task.id}>{task.name}</div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
