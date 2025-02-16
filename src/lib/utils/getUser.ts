import { getCurrentUser } from "../actions/auth";
import { prisma } from "../prisma";

export async function getUser() {
  const userId = (await getCurrentUser()) as string;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return user;
}
