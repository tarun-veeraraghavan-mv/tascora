import { updateCourse } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Course } from "@prisma/client";

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

interface EditCoursePopoverProps {
  course: Course;
}

export default function EditCoursePopover({ course }: EditCoursePopoverProps) {
  return (
    <form action={updateCourse}>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Input
          label="Name"
          defaultValue={course.name}
          name="name"
          required
          validate={(val) => {
            if (val.length < 3) {
              return "Must be atleast 3 letters long";
            }
          }}
        />
        <Input
          label="Semester number"
          type="number"
          defaultValue={String(course.semesterNumber)}
          name="semesterNumber"
          required
          min={0}
        />
        <Input
          label="Proffessor name"
          defaultValue={course.proffessorName}
          name="proffessorName"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Input
          label="Course description"
          defaultValue={course.courseDesc}
          name="courseDesc"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters long";
            }
          }}
        />
        <Input
          label="Start date"
          type="date"
          defaultValue={
            course?.startDate instanceof Date
              ? course.startDate.toISOString().split("T")[0]
              : ""
          }
          name="startDate"
          required
        />
        <Input
          label="End date"
          type="date"
          defaultValue={
            course?.endDate instanceof Date
              ? course.endDate.toISOString().split("T")[0]
              : ""
          }
          name="endDate"
          required
        />
        <Select
          label="Progress"
          name="progress"
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {progressEl.map((progress) => (
            <SelectItem key={progress.key}>{progress.label}</SelectItem>
          ))}
        </Select>
        <Input
          label="Grade"
          type="number"
          defaultValue={String(course.grade)}
          name="grade"
          required
        />
        <Select
          label="Semester color"
          name="semesterColor"
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {semesterColorEl.map((color) => (
            <SelectItem key={color.key}>{color.label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Difficulty"
          name="difficulty"
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {difficultyEl.map((difficulty) => (
            <SelectItem key={difficulty.key}>{difficulty.label}</SelectItem>
          ))}
        </Select>
        <input type="hidden" value={course.id} name="courseId" />
      </div>
      <div>
        <Button color="primary" type="submit">
          Edit course
        </Button>
        <Button>Reset</Button>
      </div>
    </form>
  );
}
