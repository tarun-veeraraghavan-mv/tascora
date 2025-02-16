"use client";

import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import {
  Expense,
  ExpenseTracker as ExpenseTrackerType,
  User,
} from "@prisma/client";
import React from "react";
import ExpenseTrackerList from "./ExpenseTrackerList";
import AddExpenseForm from "./AddExpenseForm";

interface ExpenseTrackerPageProps {
  form: ExpenseTrackerType;
  user: User;
  expenses: Expense[];
}

export default function ExpenseTracker({
  form,
  user,
  expenses,
}: ExpenseTrackerPageProps) {
  return (
    <div className="py-4">
      <div className="flex justify-between align-middle">
        <h2 className="text-2xl font-bold">Track all your expenses</h2>
        <Popover placement="left">
          <PopoverTrigger>
            <Button type="submit" color="primary">
              Add new expense
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <AddExpenseForm user={user} />
          </PopoverContent>
        </Popover>
      </div>

      <Divider />

      <div>
        <ExpenseTrackerList form={form} expenses={expenses} />
      </div>
    </div>
  );
}
