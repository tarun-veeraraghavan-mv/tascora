import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface UserType {
  user: User | null;
}

export default function Navbar({ user }: UserType) {
  return (
    <div>
      <ul className="flex gap-5">
        <li>
          <Link href="/main/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/main/courses">Courses</Link>
        </li>
        <li>
          <Link href="/main/todos">Todos</Link>
        </li>
        <li>User name: {user?.username}</li>
      </ul>
    </div>
  );
}
