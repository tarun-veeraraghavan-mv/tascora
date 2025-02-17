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

  const hashedPassword = await bcrypt.hash(password, 10);

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

  revalidatePath("/main/dashboard");
  revalidatePath("/main/courses");
}

export async function updateCourse(formData: FormData) {
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
  const courseId = formData.get("courseId") as string;

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

  await prisma.course.update({
    where: { id: parseInt(courseId) },
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
    },
  });

  revalidatePath("/main/courses");
  revalidatePath("/main/dashboard");
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
  revalidatePath("/main/dashboard");
}

export async function createTaskForCourse(formData: FormData) {
  const name = formData.get("name") as string;
  const dueDate = formData.get("dueDate") as string;
  const progress = formData.get("progress") as string;
  const priority = formData.get("priority") as string;
  const remarks = formData.get("remarks") as string;
  const userId = formData.get("userId") as string;
  const courseId = formData.get("courseId") as string;

  const newDate = new Date(dueDate);

  await prisma.task.create({
    data: {
      name,
      dueDate: newDate,
      progress,
      priority,
      remarks,
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

export async function deleteTodo(id: number) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/main/todos");
}

export async function createExpenseTrackerForm(formData: FormData) {
  const feesPerSemester = formData.get("feesPerSemester") as string;
  const otherCollegeCharges = formData.get("otherCollegeCharges") as string;
  const otherSpending = formData.get("otherSpending") as string;
  const currentSavings = formData.get("currentSavings") as string;
  const savingsGoal = formData.get("savingsGoal") as string;
  const haveJob = formData.get("haveJob") === "true";
  const currentWage = formData.get("currentWage") as string;
  const userId = formData.get("userId") as string;

  console.log(
    feesPerSemester,
    otherCollegeCharges,
    otherSpending,
    currentSavings,
    savingsGoal,
    haveJob,
    currentWage,
    userId
  );

  await prisma.expenseTracker.create({
    data: {
      feesPerSemester: parseInt(feesPerSemester),
      otherCollegeCharges: parseInt(otherCollegeCharges),
      otherSpending: parseInt(otherCollegeCharges),
      currentSavings: parseInt(currentSavings),
      savingsGoal: parseInt(savingsGoal),
      haveJob,
      currentWage: haveJob
        ? parseInt(formData.get("currentWage") as string)
        : 0,
      userId: parseInt(userId),
    },
  });

  revalidatePath("/main/expense-tracker");
}

export async function getUserExpenseForm(userId: number) {
  const form = await prisma.expenseTracker.findUnique({
    where: { userId },
  });

  console.log(form);

  return form;
}

export async function createNewExpense(formData: FormData) {
  const name = formData.get("name") as string;
  const totalExpense = formData.get("totalExpense") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  const recieptImage = formData.get("recieptImage") as string;
  const userId = formData.get("userId") as string;

  console.log(totalExpense);

  await prisma.expense.create({
    data: {
      name,
      totalExpense: parseInt(totalExpense),
      category,
      description,
      date: new Date(date),
      paymentMethod,
      recieptImage,
      userId: parseInt(userId),
    },
  });

  revalidatePath("/main/expense-tracker");
}

export async function getExpenses() {
  const expenses = await prisma.expense.findMany();

  return expenses;
}

// FILE UPLOAD

import { supabase } from "@/lib/supabase";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const courseId = formData.get("courseId") as string;

  const filePath = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("courses")
    .upload(filePath, file);

  if (error) {
    console.log(error);
  }

  await prisma.fileUpload.create({
    data: {
      courseId: parseInt(courseId),
      fileUrl: data?.path,
      name: file.name,
    },
  });

  revalidatePath("/main/courses");
}

export async function viewFiles() {
  const files = await prisma.fileUpload.findMany();

  return files;
}

// LINKS

export async function uploadLink(formData: FormData) {
  const name = formData.get("name") as string;
  const link = formData.get("link") as string;
  const courseId = formData.get("courseId") as string;

  await prisma.link.create({
    data: {
      link,
      name,
      courseId: parseInt(courseId),
    },
  });

  revalidatePath("/main/courses");
}

export async function viewLink() {
  const links = await prisma.link.findMany();

  return links;
}

export async function createContact(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const birthDate = formData.get("birthDate") as string;
  const userId = formData.get("userId") as string;

  const newBirthDate = new Date(birthDate);

  console.log("Stored in redis");

  await prisma.contact.create({
    data: {
      name,
      role,
      email,
      phone,
      birthDate: newBirthDate,
      userId: parseInt(userId),
    },
  });

  revalidatePath("/main/contacts");
}

export async function getContacts(userId: number) {
  const contacts = await prisma.contact.findMany({
    where: { userId },
  });

  return contacts;
}

export async function deleteContact(id: number) {
  await prisma.contact.delete({
    where: { id },
  });

  revalidatePath("/main/contacts");
}
