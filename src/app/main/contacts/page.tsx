import ContactTable from "@/components/contacts/ContactTable";
import Container from "@/components/ui/Container";
import { Divider } from "@heroui/react";
import React from "react";
import ContactHeader from "./ContactHeader";
import { getContacts } from "@/lib/actions/auth";
import { getUser } from "@/lib/utils/getUser";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  
  const contacts = await getContacts(user?.id);

  return (
    <Container>
      <div className="py-4">
        <ContactHeader userId={user?.id} />

        <Divider />

        <ContactTable contacts={contacts} />
      </div>
    </Container>
  );
}
