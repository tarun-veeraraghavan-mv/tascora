"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
// import UserProfile from "../user/UserProfile";
import { redirect } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import UserProfile from "../user/UserProfile";

interface UserType {
  user: User | null;
}

export default function NavHeader({ user }: UserType) {
  if (!user) {
    redirect("/");
  }

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">Taskora</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">Tascora</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/main/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="warning" href="/main/courses">
            Courses
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/main/todos">
            Todo tracker
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/main/expense-tracker">
            Expense Tracker
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <UserProfile user={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="flex flex-col">
          <Link className="w-full" href="/main/dashboard">
            Dashboard
          </Link>
          <Link className="w-full" href="/main/courses">
            Courses
          </Link>
          <Link className="w-full" href="/main/todos">
            Todo tracker
          </Link>
          <Link className="w-full" href="/main/courses">
            Expense tracker
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

{
  /* <div className="w-[1200px] mx-auto py-4 px-[32px]">
      <ul className="flex gap-5 justify-between align-middle">
        <li>
          <Link href="/main/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/main/courses">Courses</Link>
        </li>
        <li>
          <Link href="/main/todos">Todos</Link>
        </li>
        <li>
          <UserProfile user={user} />
        </li>
      </ul>
    </div> */
}
