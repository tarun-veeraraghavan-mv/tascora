import ProfileCreateForm from "@/components/profile/ProfileCreateForm";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return <ProfileCreateForm user={user} />;
}
