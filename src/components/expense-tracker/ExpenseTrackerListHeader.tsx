"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import { ExpenseTracker } from "@prisma/client";

interface ExpenseTrackerListHeaderProps {
  form: ExpenseTracker;
}

export default function ExpenseTrackerListHeader({
  form,
}: ExpenseTrackerListHeaderProps) {
  return (
    <div className="grid grid-cols-4 gap-3 py-4">
      <Card className="bg-red-300">
        <CardBody>
          <p>
            <span className="font-bold">Total college expenses: </span>$
            {form.feesPerSemester + form.otherCollegeCharges}
          </p>
        </CardBody>
        <Divider />
      </Card>
      <Card className="bg-sky-300">
        <CardBody>
          <p>
            <span className="font-bold">How much you spend: </span>$
            {form.otherSpending}
          </p>
        </CardBody>
        <Divider />
      </Card>
      <Card className="bg-green-300">
        <CardBody>
          <p>
            <span className="font-bold">Your current savings: </span>$
            {form.currentSavings}
          </p>
        </CardBody>
        <Divider />
      </Card>
      <Card className="bg-orange-300">
        <CardBody>
          <p>
            <span className="font-bold">Your weekly pay in job: </span>$
            {form.currentWage}
          </p>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
