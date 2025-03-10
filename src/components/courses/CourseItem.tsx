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
import { Course, FileUpload as FileUploadType, Link } from "@prisma/client";
import ViewCourseModel from "./ViewCourseModel";
import EditCoursePopover from "./EditCoursePopover";

import { formatDate } from "@/lib/utils/formatDate";
import ManageResourcesPopover from "./ManageResourcesPopover";

interface CourseItemProps {
  course: Course;
  files: FileUploadType[];
  links: Link[];
}

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function CourseItem({ course, files, links }: CourseItemProps) {
  console.log("COURSE ITEM FILE", files);

  return (
    <Card className={`max-w-[400px] `} key={course.id}>
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
                        <EditCoursePopover course={course} key={course.id} />
                      </PopoverContent>
                    </Popover>
                  </ListboxItem>
                  <ListboxItem color="danger">
                    <Popover>
                      <PopoverTrigger>Delete course</PopoverTrigger>
                      <PopoverContent>
                        <p className="text-lg font-bold">
                          Are you sure you want to delete this course?
                        </p>
                        <Button
                          onClick={async () => {
                            await deleteCourse(course.id);
                          }}
                        >
                          Delete course
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </ListboxItem>
                </Listbox>
              </ListboxWrapper>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex">
          <CourseProgress courseProgress={course.progress} />
          <CourseDifficulty difficulty={course.difficulty} />
        </div>
        <p>Proffessor name: {course.proffessorName}</p>
        <p>Course description: {course.courseDesc}</p>
        <p>Course start date: {formatDate(course.startDate)}</p>
        <p>Course grade: {course.grade}</p>

        <Popover>
          <PopoverTrigger>
            <Button>Manage resources</Button>
          </PopoverTrigger>
          <PopoverContent>
            <ManageResourcesPopover
              course={course}
              files={files}
              links={links}
            />
          </PopoverContent>
        </Popover>
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

function CourseDifficulty({ difficulty }: { difficulty: string }) {
  return (
    <Chip
      color={
        difficulty === "Easy"
          ? "success"
          : difficulty === "Medium"
            ? "warning"
            : "danger"
      }
    >
      {difficulty}
    </Chip>
  );
}
