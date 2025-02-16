"use client";

import { createProfile } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { User } from "@prisma/client";

interface UserType {
  user: User;
}

export const animals = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
];

export default function ProfileCreateForm({ user }: UserType) {
  console.log(user.id);

  return (
    <form
      action={createProfile}
      className="w-[330px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <h2 className="text-3xl font-bold mb-5">Create your profile</h2>
      <div className="mb-5 flex flex-col gap-3">
        <Input type="date" name="dateOfBirth" label="Date of birth" required />

        <Select
          className="max-w-xs"
          items={animals}
          label="Your gender"
          placeholder="What is your gender"
          name="gender"
          required
        >
          {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select>

        <Input
          type="text"
          label="Location"
          name="location"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Location must be atleast 5 letters";
            }
          }}
        />

        <Input
          type="text"
          label="Current college"
          name="currentCollege"
          required
          validate={(val) => {
            if (val.length < 3) {
              return "Location must be atleast 3 letters";
            }
          }}
        />

        <Input
          type="text"
          label="Major"
          name="major"
          required
          validate={(val) => {
            if (val.length < 3) {
              return "Location must be atleast 3 letters";
            }
          }}
        />

        <Input type="text" label="Minor (if no minor type None)" name="minor" required />

        <input type="hidden" value={String(user?.id)} name="userId" />
      </div>
      <div className="flex gap-3">
        <Button color="primary" type="submit">
          Create user
        </Button>
        <Button type="reset">Reset</Button>
      </div>
    </form>
  );
}
