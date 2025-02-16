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

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

export default function NavBar({ user }: UserType) {
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
          <p className="font-bold text-inherit">ACME</p>
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
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <UserProfile user={user} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
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
