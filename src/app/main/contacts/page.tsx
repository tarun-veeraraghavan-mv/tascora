import ContactTable from "@/components/contacts/ContactTable";
import Container from "@/components/ui/Container";
import { Divider } from "@heroui/react";
import React from "react";
import ContactHeader from "./ContactHeader";
import { getContacts } from "@/lib/actions/auth";

export default async function page() {
  const contacts = await getContacts();

  return (
    <Container>
      <div className="py-4">
        <ContactHeader />

        <Divider />

        <ContactTable contacts={contacts} />
      </div>
    </Container>
  );
}
