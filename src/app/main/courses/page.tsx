import CourseHeader from "@/components/courses/CourseHeader";
import CourseItem from "@/components/courses/CourseItem";

import { getAllCourses } from "@/lib/utils/getAllCourses";
import { getUser } from "@/lib/utils/getUser";
import { Divider } from "@heroui/react";
import { Course } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const courses = await getAllCourses(user?.id);

  return (
    <div>
      <CourseHeader user={user} />

      <Divider />

      <ul className="grid grid-cols-4 gap-3">
        {courses.map((course: Course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </ul>
    </div>
  );
}
