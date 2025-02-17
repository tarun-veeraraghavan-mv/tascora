import ClientPage from "@/components/courses/ClientPage";
import Container from "@/components/ui/Container";
import { viewFiles, viewLink } from "@/lib/actions/auth";

import { getAllCourses } from "@/lib/utils/getAllCourses";
import { getUser } from "@/lib/utils/getUser";
import { Course, FileUpload, Link } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const courses: Course[] = await getAllCourses(user?.id);
  const files: FileUpload[] = await viewFiles();
  console.log(files);
  const links: Link[] = await viewLink();

  return (
    <Container>
      <ClientPage courses={courses} user={user} files={files} links={links} />
    </Container>
  );
}
