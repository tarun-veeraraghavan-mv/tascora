"use client";

// import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { User } from "@prisma/client";
import React from "react";

interface DashboardHeader {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeader) {
  return (
    <div>
      <div className="flex justify-between align-middle">
        <h2 className="text-3xl font-bold ">
          👋 Welcome! <span className="uppercase">{user.username}</span>
        </h2>
        <p className="text-lg">
          <span className="font-bold">Todays Date:</span>{" "}
          {new Date().toDateString()}
        </p>
      </div>
    </div>
  );
}
