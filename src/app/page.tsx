"use client";

import { signIn } from "@/lib/actions/auth";
import { Button, Input } from "@heroui/react";

export default function page() {
  return (
    <form
      action={signIn}
      className="w-[330px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <h2 className="text-3xl font-bold mb-5">Create new account!</h2>

      <div className="mb-5 flex gap-4 flex-col">
        <Input type="text" name="username" label="Username" />
        <Input name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
      </div>

      <div className="flex gap-3">
        <Button type="submit" color="primary">
          Sign in
        </Button>
        <Button type="reset">Reset</Button>
      </div>
    </form>
  );
}
