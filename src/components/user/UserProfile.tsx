"use client";

import { signOut } from "@/lib/actions/auth";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User as UserComp,
} from "@heroui/react";
import { User } from "@prisma/client";

interface UserType {
  user: User;
}

export default function UserProfile({ user }: UserType) {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <UserComp
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={user.username}
        />
      </PopoverTrigger>
      <PopoverContent>
        <form action={signOut}>
          <Button type="submit">Sign out</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
