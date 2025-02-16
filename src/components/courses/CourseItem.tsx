"use client";

import { deleteCourse } from "@/lib/actions/auth";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Course } from "@prisma/client";
import ViewCourseModel from "./ViewCourseModel";
import EditCoursePopover from "./EditCoursePopover";
import FileUpload from "./FileUpload";

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
    <Card className={`max-w-[400px] `}>
      <CardHeader
        className="flex gap-3 justify-between"
        style={{ backgroundColor: `${course.semesterColor}` }}
      >
        <div>
          <p className="text-md">Semester {course.semesterNumber}</p>
          <p className="text-small text-default-500">{course.name}</p>
        </div>
        <div>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button>Option</Button>
            </PopoverTrigger>
            <PopoverContent>
              <ListboxWrapper>
                <Listbox>
                  <ListboxItem>
                    <Popover>
                      <PopoverTrigger>
                        <p>View course</p>
                      </PopoverTrigger>
                      <PopoverContent>
                        <ViewCourseModel course={course} />
                      </PopoverContent>
                    </Popover>
                  </ListboxItem>
                  <ListboxItem>
                    <Popover>
                      <PopoverTrigger>Edit course</PopoverTrigger>
                      <PopoverContent>
                        <EditCoursePopover course={course} />
                      </PopoverContent>
                    </Popover>
                  </ListboxItem>
                  <ListboxItem color="danger">
                    <button
                      onClick={async () => {
                        await deleteCourse(course.id);
                      }}
                    >
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
        <CourseProgress courseProgress={course.progress} />
        <p>Proffessor name: {course.proffessorName}</p>
        <p>Course description: {course.courseDesc}</p>
        <p>Course start date: </p>

        <p>Course difficulty: {course.difficulty}</p>

        <FileUpload courseId={String(course.id)} />
      </CardBody>
      <Divider />
    </Card>
  );
}

function CourseProgress({ courseProgress }: { courseProgress: string }) {
  if (courseProgress === "In progress") {
    return (
      <Chip color="warning" className="mb-2">
        {courseProgress}
      </Chip>
    );
  }

  if (courseProgress === "Not Started") {
    return (
      <Chip color="danger" className="mb-2">
        {courseProgress}
      </Chip>
    );
  }

  if (courseProgress === "Completed") {
    return (
      <Chip color="success" className="mb-2">
        {courseProgress}
      </Chip>
    );
  }
}
