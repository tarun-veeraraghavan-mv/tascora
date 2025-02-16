"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = "qwsqwehweruwehrweiourhwer";
const JWT_EXPIRES_IN = "90d";

export async function signIn(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await bcrypt.hash(password, 14);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  redirect("/profile");
}

export async function login(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = (await prisma.user.findUnique({
    where: { email },
  })) as User;

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
  }

  redirect("/main/dashboard");
}

export async function signOut() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  redirect("/");
}

interface Decoded {
  id: string;
  iat: number;
  exp: number;
}

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

  return decoded.id;
}

export async function createProfile(formData: FormData) {
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as string;
  const location = formData.get("location") as string;
  const currentCollege = formData.get("currentCollege") as string;
  const major = formData.get("major") as string;
  const minor = formData.get("minor") as string;
  const userId = formData.get("userId") as string;

  console.log(userId, major, minor);

  const newDateOfBirth = new Date(dateOfBirth);
  console.log(gender, location, userId);

  console.log("PRISMA" + prisma);

  await prisma.profile.create({
    data: {
      dateOfBirth: newDateOfBirth,
      gender,
      location,
      currentCollege,
      major,
      minor,
      userId: parseInt(userId),
    },
  });

  redirect("/main/dashboard");
}

export async function createCourse(formData: FormData) {
  const name = formData.get("name") as string;
  const semesterNumber = formData.get("semesterNumber") as string;
  const proffessorName = formData.get("proffessorName") as string;
  const courseDesc = formData.get("courseDesc") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  // const startTime = formData.get("startTime") as string;
  // const endTime = formData.get("endTime") as string;
  const progress = formData.get("progress") as string;
  const grade = formData.get("grade") as string;
  const semesterColor = formData.get("semesterColor") as string;
  const difficulty = formData.get("difficulty") as string;
  const userId = formData.get("userId") as string;

  console.log({
    name,
    semesterNumber,
    proffessorName,
    courseDesc,
    startDate,
    endDate,
    // startTime,
    // endTime,
    progress, // 🔴 Check this in the console
    grade,
    semesterColor,
    difficulty,
    userId,
  });

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  await prisma.course.create({
    data: {
      semesterNumber: parseInt(semesterNumber),
      name,
      proffessorName,
      courseDesc,
      startDate: newStartDate,
      endDate: newEndDate,
      // startTime,
      // endTime,
      progress,
      grade: parseInt(grade),
      semesterColor,
      difficulty,
      userId: parseInt(userId),
    },
  });

  revalidatePath("/main/courses");
}

export async function getCourseForUser(id: number) {
  const courses = await prisma.course.findMany({
    where: { userId: id },
  });

  return courses;
}

export async function deleteCourse(id: number) {
  await prisma.course.delete({
    where: { id },
  });

  revalidatePath("/main/courses");
}

export async function createTaskForCourse(formData: FormData) {
  const dueDate = formData.get("dueDate") as string;
  const name = formData.get("name") as string;
  const userId = formData.get("userId") as string;
  const courseId = formData.get("courseId") as string;

  const newDate = new Date(dueDate);

  await prisma.task.create({
    data: {
      dueDate: newDate,
      name,
      userId: parseInt(userId),
      courseId: parseInt(courseId),
    },
  });

  revalidatePath("/main/todos");
}

export async function getTasks(id: number) {
  const tasks = await prisma.task.findMany({
    where: { userId: id },
  });

  return tasks;
}
