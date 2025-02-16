"use client";

import { createTaskForCourse } from "@/lib/actions/auth";
import { Button, Input } from "@heroui/react";
import { Course, User } from "@prisma/client";

interface CreateTodoFormProps {
  user: User;
  course: Course;
}

export default function CreateTodoForm({ user, course }: CreateTodoFormProps) {
  return (
    <form action={createTaskForCourse}>
      <h2 className="text-lg font-bold mb-5">Create new todo</h2>
      <div className="flex flex-col gap-3 mb-5">
        <Input type="text" label="Name" name="name" required />

        <Input type="date" name="dueDate" label="Due date" required />

        <input type="hidden" value={user.id} name="userId" />
        <input name="courseId" value={course.id} type="hidden" />
      </div>
      <div>
        <Button type="submit" color="primary">
          Create new task
        </Button>
      </div>
    </form>
  );
}
