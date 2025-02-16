"use client";

import { createCourse } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { User } from "@prisma/client";
import React from "react";

interface UserType {
  user: User;
}

export const progressEl = [
  { key: "Not Started", label: "Not Started" },
  { key: "In progress", label: "In progress" },
  { key: "Completed", label: "Completed" },
];

export const semesterColorEl = [
  { key: "Red", label: "Red" },
  { key: "Green", label: "Green" },
  { key: "Teal", label: "Teal" },
  { key: "Orange", label: "Orange" },
];

export const difficultyEl = [
  { key: "Easy", label: "Easy" },
  { key: "Medium", label: "Medium" },
  { key: "Hard", label: "Hard" },
];

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
        <Select label="Progress" name="progress" items={progressEl}>
          {(progress) => (
            <SelectItem key={progress.key}>{progress.key}</SelectItem>
          )}
        </Select>
        <Input type="number" label="Grade" name="grade" min={0} />
        <Select
          label="Semester color"
          name="semesterColor"
          items={semesterColorEl}
        >
          {(semesterColor) => (
            <SelectItem key={semesterColor.key}>
              {semesterColor.label}
            </SelectItem>
          )}
        </Select>
        <Select label="Difficulty" name="difficulty" items={difficultyEl}>
          {(difficultyEl) => (
            <SelectItem key={difficultyEl.key}>{difficultyEl.label}</SelectItem>
          )}
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
