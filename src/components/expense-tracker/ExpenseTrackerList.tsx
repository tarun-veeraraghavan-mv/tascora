"use client";

import { Expense, ExpenseTracker } from "@prisma/client";
import React from "react";
import ExpenseTrackerListHeader from "./ExpenseTrackerListHeader";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { formatDate } from "@/lib/utils/formatDate";

interface ExpenseTrackerListProps {
  form: ExpenseTracker;
  expenses: Expense[];
}

export default function ExpenseTrackerList({
  form,
  expenses,
}: ExpenseTrackerListProps) {
  return (
    <div>
      <ExpenseTrackerListHeader form={form} />
      <div>
        <h3 className="text-xl font-bold">All of your previous expenses</h3>
        <ul className="grid grid-cols-3 gap-3 py-2">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <Card className="p-2">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Name: {expense.name} </p>
                    <p className="text-small text-default-500">
                      Date: {formatDate(expense.date)}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p></p>
                  <p>Course name: {expense.category}</p>
                  <p>Description: {expense.description}</p>
                  <p>Total expense: {expense.totalExpense}</p>
                  <p>Reciept image: {expense.recieptImage}</p>
                  <p>Payment method: {expense.paymentMethod}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
