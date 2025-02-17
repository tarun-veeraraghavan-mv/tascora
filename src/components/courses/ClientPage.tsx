"use client";

import React, { useState } from "react";
import CourseHeader from "./CourseHeader";
import { Divider } from "@heroui/react";
import CourseItem from "./CourseItem";
import { Course, FileUpload, Link, User } from "@prisma/client";

interface ClientPageProps {
  user: User;
  courses: Course[];
  files: FileUpload[];
  links: Link[];
}

export default function ClientPage({
  user,
  courses,
  files,
  links,
}: ClientPageProps) {
  const [input, setInput] = useState("");

  console.log("CLIENT PAGHE FILE", files);

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

      <ul className="grid  sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-3 py-4">
        {filteredCourses.map((course) => (
          <CourseItem
            course={course}
            key={course.id}
            files={files}
            links={links}
          />
        ))}
      </ul>
    </div>
  );
}
