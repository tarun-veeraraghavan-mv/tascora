import { Course } from "@prisma/client";
import React from "react";

interface ViewCourseModelProps {
  course: Course;
}

export default function ViewCourseModel({ course }: ViewCourseModelProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="text-lg">Semester number: {course.semesterNumber}</div>
      <div className="text-lg">Course name: {course.name}</div>
      <div className="text-lg">Proffessor name: {course.proffessorName}</div>
      <div className="text-lg">{course.progress}</div>
      <div className="text-lg"> Course difficulty: {course.difficulty}</div>
      <div className="text-lg">Course grade: {course.grade}</div>
      <div className="text-lg">Course description: {course.courseDesc}</div>
    </div>
  );
}
