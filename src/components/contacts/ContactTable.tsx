"use client";

import { deleteContact } from "@/lib/actions/auth";
import { formatDate } from "@/lib/utils/formatDate";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Contact } from "@prisma/client";
import React from "react";

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>PHONE</TableColumn>
        <TableColumn>Birth date</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      {contacts.length < 1 ? (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      ) : (
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.role}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{formatDate(contact.birthDate)}</TableCell>
              <TableCell>
                <Button onClick={() => deleteContact(contact.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
