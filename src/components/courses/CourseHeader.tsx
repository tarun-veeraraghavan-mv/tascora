"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { User } from "@prisma/client";
import AddCoursePopover from "./AddCoursePopover";

interface UserType {
  user: User;
}

export default function CourseHeader({ user }: UserType) {
  return (
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold ">All of your courses</h2>
      <Input
        placeholder="Search your courses"
        className="w-[300px] focus:w-[350px] transition-all duration-200"
      />
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Add new course</Button>
        </PopoverTrigger>
        <PopoverContent>
          <AddCoursePopover user={user} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
