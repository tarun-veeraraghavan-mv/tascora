"use client";

import { createCourse } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { User } from "@prisma/client";
import React from "react";

interface UserType {
  user: User;
}

export default function AddCoursePopover({ user }: UserType) {
  return (
    <form action={createCourse}>
      <h3 className="text-xl font-bold mb-3"> Create your new course</h3>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Input
          type="text"
          label="Name"
          name="name"
          validate={(val) => {
            if (val.length < 3) {
              return "Must be atleast 3 letters long";
            }
          }}
        />
        <Input
          type="number"
          label="Semester number"
          name="semesterNumber"
          min={0}
        />
        <Input
          type="text"
          label="Proffessor name"
          name="proffessorName"
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Textarea
          type="text"
          label="Course description"
          name="courseDesc"
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Input type="date" label="Start date" name="startDate" />
        <Input type="date" label="End date" name="endDate" />
        <Select label="Progress" name="progress">
          <SelectItem value="Not started">Not started</SelectItem>
          <SelectItem value="In progress">In progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </Select>
        <Input type="number" label="Grade" name="grade" min={0} />
        <Select label="Semester color" name="semesterColor">
          <SelectItem value="Red">Red</SelectItem>
          <SelectItem value="Green">Green</SelectItem>
          <SelectItem value="Teal">Teal</SelectItem>
          <SelectItem value="Cyan">Cyan</SelectItem>
        </Select>
        <Select label="Difficulty" name="difficulty">
          <SelectItem color="success"  value="Easy">Easy</SelectItem>
          <SelectItem color="warning" value="Medium">Medium</SelectItem>
          <SelectItem color="danger" value="Hard">Hard</SelectItem>
        </Select>

        <input type="hidden" value={user?.id} name="userId" />
      </div>
      <div className="flex gap-3">
        <Button type="submit" color="primary">
          Create course
        </Button>
        <Button type="reset">Reset</Button>
      </div>
    </form>
  );
}
