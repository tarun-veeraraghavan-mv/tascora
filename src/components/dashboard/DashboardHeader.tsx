"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Course } from "@prisma/client";
import React from "react";

interface DashboardHeader {
  courses: Course[];
}

export default function DashboardHeader({ courses }: DashboardHeader) {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 mb-5">
      <ul>
        <Card className="max-w-[400px]">
          <CardHeader className="bg-green-200">
            <p>
              Courses marked{" "}
              <span className="p-1 bg-red-500 text-white rounded-lg">
                Not Started
              </span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            {courses
              .filter((course) => course.progress === "Not Started")
              .map((course) => (
                <div key={course.id}>
                  <h2 className="text-lg font-bold">{course.name}</h2>
                  <p>Semester number: {course.semesterNumber}</p>
                </div>
              ))}
          </CardBody>
          <Divider />
        </Card>
      </ul>
      <ul>
        <Card className="max-w-[400px]">
          <CardHeader className="bg-cyan-200">
            <p>
              Courses marked
              <span className="p-1 bg-orange-500 text-white rounded-lg">
                In progress
              </span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            {courses.length > 0 ? (
              courses
                .filter((course) => course.progress === "In progress")
                .map((course) => (
                  <div key={course.id}>
                    <h2 className="text-lg font-bold">{course.name}</h2>
                    <p>Semester number: {course.semesterNumber}</p>
                  </div>
                ))
            ) : (
              <p>No course found</p>
            )}
          </CardBody>
          <Divider />
        </Card>
      </ul>
      <ul>
        <Card className="max-w-[400px]">
          <CardHeader className="bg-pink-200">
            <p>
              Courses marked{" "}
              <span className="p-1 bg-green-500 text-white rounded-lg">
                In progress
              </span>
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            {courses
              .filter((course) => course.progress === "Completed")
              .map((course) => (
                <div key={course.id}>
                  <h2 className="text-lg font-bold">{course.name}</h2>
                  <p>Semester number: {course.semesterNumber}</p>
                </div>
              ))}
          </CardBody>
          <Divider />
        </Card>
      </ul>
    </div>
  );
}
