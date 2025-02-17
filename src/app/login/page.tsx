"use client";

import { login } from "@/lib/actions/auth";
import { Button, Input } from "@heroui/react";
import React from "react";
import { useFormStatus } from "react-dom";

export default function page() {
  return (
    <form
      action={login}
      className="w-[330px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <h2 className="text-3xl font-bold mb-5">Log in to account!</h2>

      <div className="flex flex-col gap-4 mb-4">
        <Input name="email" label="Email" type="email" required />
        <Input name="password" label="Password" type="password" required />
      </div>
      <div>
        <FormButton />
      </div>

      
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit">
      {pending ? "Logging ..." : "Log in"}
    </Button>
  );
}
