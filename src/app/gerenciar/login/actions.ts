"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function loginAction(
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  let settings = await prisma.adminSettings.findUnique({
    where: { id: "singleton" },
  });

  // Fallback: create default credentials if none exist
  if (!settings) {
    const hash = await bcrypt.hash("hotel2024", 10);
    settings = await prisma.adminSettings.create({
      data: {
        id: "singleton",
        username: "admin",
        passwordHash: hash,
      },
    });
  }

  if (settings.username !== username) {
    return { success: false, error: "Usuário ou senha incorretos" };
  }

  const valid = await bcrypt.compare(password, settings.passwordHash);
  if (!valid) {
    return { success: false, error: "Usuário ou senha incorretos" };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
