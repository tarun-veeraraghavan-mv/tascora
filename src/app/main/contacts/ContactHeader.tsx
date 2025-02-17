"use client";

import { createContact } from "@/lib/actions/auth";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import React from "react";

export default function ContactHeader({ userId }: { userId: number }) {
  return (
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Add friends and proffessors</h2>
      <Popover placement="left">
        <PopoverTrigger>
          <Button type="submit" color="primary">
            Add contact
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={createContact}>
            <div className="grid grid-cols-2">
              <Input label="Name" required name="name" />
              <Input label="Role" required name="role" />
              <Input label="Email" required name="email" />
              <Input label="Phone" required name="phone" type="phone" />
              <Input label="Birth date" required name="birthDate" type="date" />
              <input type="hidden" value={userId} name="userId" />
            </div>
            <div>
              <Button type="submit" color="primary">
                Create contact
              </Button>
              <Button type="reset">Reset</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
