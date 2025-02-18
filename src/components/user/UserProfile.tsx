"use client";

import { signOut, updateUser } from "@/lib/actions/auth";
import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User as UserComp,
} from "@heroui/react";
import { User } from "@prisma/client";
import { ListboxWrapper } from "../courses/CourseItem";

interface UserType {
  user: User;
}

export default function UserProfile({ user }: UserType) {
  return (
    <Popover>
      <PopoverTrigger>
        <UserComp
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={user.username}
        />
      </PopoverTrigger>
      <PopoverContent>
        <ListboxWrapper>
          <Listbox aria-label="Dynamic Actions">
            <ListboxItem>
              <Popover placement="left">
                <PopoverTrigger>Sign out</PopoverTrigger>
                <PopoverContent>
                  <form action={signOut}>
                    <h2 className="text-lg">
                      Are you sure you want to sign out
                    </h2>
                    <Button type="submit">Signout</Button>
                  </form>
                </PopoverContent>
              </Popover>
            </ListboxItem>
            <ListboxItem>
              <Popover placement="left">
                <PopoverTrigger>Update account</PopoverTrigger>
                <PopoverContent>
                  <form action={updateUser}>
                    <Input
                      defaultValue={user.username}
                      label="Username"
                      name="username"
                    />
                    <Input defaultValue={user.email} label="Email" name="email" />
                    <input value={user.id} type="hidden" name="userId" />
                    <Button type="submit">Update account</Button>
                  </form>
                </PopoverContent>
              </Popover>
            </ListboxItem>
          </Listbox>
        </ListboxWrapper>
      </PopoverContent>
    </Popover>
  );
}

{
  /* 
        
         <form action={signOut}>Sign out</form>*/
}
