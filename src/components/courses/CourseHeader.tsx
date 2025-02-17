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
import { Dispatch, SetStateAction } from "react";

interface UserType {
  user: User;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

export default function CourseHeader({ user, input, setInput }: UserType) {
  return (
    <div className="flex justify-between py-4">
      <h2 className="text-3xl font-bold md:block hidden">All of your courses</h2>
      <Input
        placeholder="Search your courses"
        className="sm:w-[300px] w-[200px] transition-all duration-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div>
        <Popover placement="left">
          <PopoverTrigger>
            <Button color="primary">Add new course</Button>
          </PopoverTrigger>
          <PopoverContent>
            <AddCoursePopover user={user} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
