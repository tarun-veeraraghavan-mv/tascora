"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Task } from "@prisma/client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TaskDashboardGraphProps {
  tasks: Task[];
}

export default function TaskDashboardGraph({ tasks }: TaskDashboardGraphProps) {
  const notStartedTasks = tasks?.filter(
    (task) => task.progress === "Not Started"
  );
  const inProgressTasks = tasks?.filter(
    (task) => task.progress === "In progress"
  );
  const completedTasks = tasks?.filter((task) => task.progress === "Completed");

  console.log(notStartedTasks);

  console.log(
    "LENGTH",
    notStartedTasks.length,
    inProgressTasks.length,
    completedTasks.length
  );

  const data = [
    {
      name: "In progress",
      count: inProgressTasks.length,
    },
    {
      name: "Not Started",
      count: notStartedTasks.length,
    },
    {
      name: "Completed",
      count: completedTasks.length,
    },
  ];

  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>COUNT</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="2">
              <TableCell>Not Started</TableCell>
              <TableCell>{notStartedTasks.length}</TableCell>
            </TableRow>
            <TableRow key="1">
              <TableCell>In progress</TableCell>
              <TableCell>{inProgressTasks.length}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Completed</TableCell>
              <TableCell>{completedTasks.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <ResponsiveContainer width={450} height={300}>
          <BarChart width={200} height={300} data={data}>
            <Bar dataKey="count" fill="blue" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
