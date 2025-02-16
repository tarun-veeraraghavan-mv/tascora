import NavHeader from "@/components/ui/NavHeader";
import { getUser } from "@/lib/utils/getUser";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div>
      <div>
        <NavHeader user={user} />
      </div>
      <div>{children}</div>
    </div>
  );
}
