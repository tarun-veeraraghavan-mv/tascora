import ClientPage from "@/components/courses/ClientPage";
import Container from "@/components/ui/Container";

import { getAllCourses } from "@/lib/utils/getAllCourses";
import { getUser } from "@/lib/utils/getUser";
import { Course } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const courses: Course[] = await getAllCourses(user?.id);

  return (
    <Container>
      <ClientPage courses={courses} user={user} />
    </Container>
  );
}
