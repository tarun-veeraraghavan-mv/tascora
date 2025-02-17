"use client";

import { signIn } from "@/lib/actions/auth";
import { Button, Input } from "@heroui/react";
import Link from "next/link";

export default function page() {
  return (
    <form
      action={signIn}
      className="w-[330px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <h2 className="text-3xl font-bold mb-5">Create new account!</h2>

      <div className="mb-5 flex gap-4 flex-col">
        <Input
          type="text"
          name="username"
          label="Username"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Name must be atleast 5 letters";
            }
          }}
          id="username-input"
        />
        <Input name="email" label="Email" required id="email-input" />
        <Input
          type="password"
          name="password"
          label="Password"
          required
          validate={(val) => {
            if (val.length < 8) {
              return "Password must be atleast 8 letters";
            }
          }}
          id="password-input"
        />
      </div>

      <div className="flex gap-3 mb-5">
        <Button type="submit" color="primary" id="signin-button">
          Sign in
        </Button>
        <Button type="reset">Reset</Button>
      </div>

      <Link href="/login">Have an account? Log in &rarr;</Link>
    </form>
  );
}
