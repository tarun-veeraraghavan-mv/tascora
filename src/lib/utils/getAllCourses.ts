import { getCourseForUser } from "../actions/auth";

export async function getAllCourses(id: number) {
  const courses = await getCourseForUser(id);

  console.log(courses);
  return courses;
}
