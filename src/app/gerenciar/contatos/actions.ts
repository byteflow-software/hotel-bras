"use server";

import { revalidatePath } from "next/cache";
import { prisma, safePrismaOperation } from "@/lib/prisma";

export async function getContacts() {
  return safePrismaOperation(
    () => prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    }),
    []
  );
}

export async function getUnreadContactsCount() {
  return safePrismaOperation(
    () => prisma.contact.count({
      where: { isRead: false },
    }),
    0
  );
}

export async function markContactAsRead(id: string) {
  await prisma.contact.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/gerenciar/contatos");
  revalidatePath("/gerenciar");
}

export async function markAllContactsAsRead() {
  await prisma.contact.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });
  revalidatePath("/gerenciar/contatos");
  revalidatePath("/gerenciar");
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({
    where: { id },
  });
  revalidatePath("/gerenciar/contatos");
  revalidatePath("/gerenciar");
}

export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  await prisma.contact.create({
    data,
  });
  revalidatePath("/gerenciar/contatos");
}
