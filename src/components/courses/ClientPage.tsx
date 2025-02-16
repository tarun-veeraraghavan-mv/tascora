"use client";

import React, { useState } from "react";
import CourseHeader from "./CourseHeader";
import { Divider } from "@heroui/react";
import CourseItem from "./CourseItem";
import { Course, User } from "@prisma/client";

interface ClientPageProps {
  user: User;
  courses: Course[];
}

export default function ClientPage({ user, courses }: ClientPageProps) {
  const [input, setInput] = useState("");

  const filteredCourses =
    input.length > 0
      ? courses.filter((course) =>
          course.name.toLowerCase().includes(input.toLowerCase())
        )
      : courses;

  return (
    <div>
      <CourseHeader user={user} input={input} setInput={setInput} />

      <Divider />

      <ul className="grid grid-cols-3 gap-3 py-4">
        {filteredCourses.map((course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </ul>
    </div>
  );
}
