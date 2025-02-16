"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Course, Task, User } from "@prisma/client";
import CreateTodoForm from "./CreateTodoForm";
import { deleteTodo } from "@/lib/actions/auth";

interface TodoItem {
  course: Course;
  user: User;
  tasks: Task[];
}

export default function TodoItem({ course, user, tasks }: TodoItem) {
  return (
    <div>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 justify-between">
          <div className="flex flex-col">
            <p className="text-md">Semester {course.semesterNumber}</p>
            <p className="text-small text-default-500">{course.name}</p>
          </div>
          <div>
            <Popover>
              <PopoverTrigger>
                <Button>Create new todo</Button>
              </PopoverTrigger>
              <PopoverContent>
                <CreateTodoForm user={user} course={course} />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3">
          {tasks
            .filter((task) => task.courseId === course.id)
            .map((task) => (
              <li key={task.id} className="bg-gray-200  rounded-lg p-1">
                <p>Task name: {task.name}</p>
                <p>Due date: {formatDate(task.dueDate)}</p>
                <Button color="danger" onClick={() => deleteTodo(task.id)}>
                  Delete
                </Button>
              </li>
            ))}
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}

function formatDate(isoString: Date) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
