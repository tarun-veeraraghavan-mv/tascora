"use client";

import { createCourse } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";
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
  { key: "#FDA4AF", label: "Red" },
  { key: "#F9A8D4", label: "Pink" },
  { key: "#BEF264", label: "Green" },
  { key: "#FDBA74", label: "Orange" },
  { key: "#67E8F9", label: "Cyan" },
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        <Input
          type="text"
          label="Name"
          name="name"
          required
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
          required
          min={0}
        />
        <Input
          type="text"
          label="Proffessor name"
          name="proffessorName"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Input
          type="text"
          label="Course description"
          name="courseDesc"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Input type="date" label="Start date" name="startDate" required />
        <Input type="date" label="End date" name="endDate" required />
        <Select
          label="Progress"
          name="progress"
          items={progressEl}
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {(progress) => (
            <SelectItem key={progress.key}>{progress.key}</SelectItem>
          )}
        </Select>
        <Input type="number" label="Grade" name="grade" min={0} required />
        <Select
          label="Semester color"
          name="semesterColor"
          items={semesterColorEl}
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {(semesterColor) => (
            <SelectItem key={semesterColor.key}>
              {semesterColor.label}
            </SelectItem>
          )}
        </Select>
        <Select
          label="Difficulty"
          name="difficulty"
          items={difficultyEl}
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
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
