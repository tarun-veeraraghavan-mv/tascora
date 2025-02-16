"use client";

import { createExpenseTrackerForm } from "@/lib/actions/auth";
import { Button, Checkbox, Input } from "@heroui/react";
import { User } from "@prisma/client";
import { useState } from "react";

interface ExpenseTrackerFormProps {
  user: User;
}

export default function ExpenseTrackerForm({ user }: ExpenseTrackerFormProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <form
      className="w-[330px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      action={createExpenseTrackerForm}
    >
      <h2 className="text-3xl font-bold mb-5">Some Questions</h2>
      <div className="flex flex-col gap-3 mb-5">
        <Input
          label="How much fees for each semester?"
          type="number"
          required
          name="feesPerSemester"
        />
        <Input
          label="How much accomadation or other college charges?"
          type="number"
          required
          name="otherCollegeCharges"
        />
        <Input
          label="How much do you spend for yourelf"
          required
          name="otherSpending"
        />
        <Input
          label="How much money do you have now?"
          type="number"
          required
          name="currentSavings"
        />
        <Input
          label="What is your savings goal"
          type="number"
          required
          name="savingsGoal"
        />
        <div className="flex flex-col gap-2">
          <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
            Do you have a job right now?
          </Checkbox>
          {isSelected && (
            <Input
              type="number"
              label="How much do you earn a week?"
              name="currentWage"
            />
          )}
          <input
            type="hidden"
            name="haveJob"
            value={isSelected ? "true" : "false"}
          />
          <input type="hidden" value={user.id} name="userId" />
        </div>
      </div>
      <div>
        <Button type="submit" color="primary">
          Start tracking
        </Button>
        <Button type="reset">Reset</Button>
      </div>
    </form>
  );
}
