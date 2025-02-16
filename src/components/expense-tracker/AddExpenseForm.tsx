import { createNewExpense } from "@/lib/actions/auth";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { User } from "@prisma/client";
import React from "react";

export const paymentMethodEl = [
  { key: "Credit card", label: "Credit card" },
  { key: "Cash", label: "Cash" },
  { key: "Bank Transfer", label: "Bank Transfer" },
];

export const categoryEl = [
  { key: "Food", label: "Food" },
  { key: "Rent", label: "Rent" },
  { key: "Travel", label: "Travel" },
  { key: "Utilities", label: "Utilities" },
  { key: "Other", label: "Other" },
];

interface AddExpenseFormProps {
  user: User;
}

export default function AddExpenseForm({ user }: AddExpenseFormProps) {
  return (
    <form action={createNewExpense}>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Input
          type="number"
          name="totalExpense"
          label="Total expense"
          required
        />
        <Select
          label="Payment method"
          name="paymentMethod"
          items={paymentMethodEl}
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {(method) => <SelectItem key={method.key}>{method.key}</SelectItem>}
        </Select>
        <Select
          label="Category"
          name="category"
          items={categoryEl}
          required
          validate={(val) => {
            if (!val) {
              return "Select a value";
            }
          }}
        >
          {(method) => <SelectItem key={method.key}>{method.key}</SelectItem>}
        </Select>
        <Input type="date" name="date" label="Date" required />
        <Input
          type="description"
          name="description"
          label="Description"
          required
          validate={(val) => {
            if (val.length < 5) {
              return "Must be atleast 5 letters";
            }
          }}
        />
        <Input type="text" name="recieptImage" />

        <input type="hidden" value={user.id} name="userId" />
      </div>
      <div className="flex gap-3">
        <Button type="submit" color="primary">
          Create expense
        </Button>
        <Button type="reset">Reset</Button>
      </div>
    </form>
  );
}
