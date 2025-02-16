"use client";

import { deleteCourse } from "@/lib/actions/auth";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Course } from "@prisma/client";

interface CourseItemProps {
  course: Course;
}

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <p className="text-md">Semester 1</p>
          <p className="text-small text-default-500">{course.name}</p>
        </div>
        <div>
          <Popover placement="right">
            <PopoverTrigger>
              <Button>Option</Button>
            </PopoverTrigger>
            <PopoverContent>
              <ListboxWrapper>
                <Listbox>
                  <ListboxItem>Copy course</ListboxItem>
                  <ListboxItem>Edit course</ListboxItem>
                  <ListboxItem color="danger">
                    <button onClick={() => deleteCourse(course.id)}>
                      Delete course
                    </button>
                  </ListboxItem>
                </Listbox>
              </ListboxWrapper>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Proffessor name: {course.proffessorName}</p>
        <p>Course description: {course.courseDesc}</p>
        <p>Course start date: </p>
        <p>Course progress: {course.progress}</p>
        <p>Course difficulty: {course.difficulty}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
