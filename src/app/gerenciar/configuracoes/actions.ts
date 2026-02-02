"use server";

import { prisma, safePrismaOperation } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getAdminSettings() {
  const settings = await safePrismaOperation(
    () => prisma.adminSettings.findUnique({
      where: { id: "singleton" },
    }),
    null
  );
  if (!settings) return null;
  return {
    username: settings.username,
    recoveryEmail: settings.recoveryEmail,
    logo: settings.logo,
  };
}

export async function getSiteLogo(): Promise<string> {
  const settings = await safePrismaOperation(
    () => prisma.adminSettings.findUnique({
      where: { id: "singleton" },
      select: { logo: true },
    }),
    null
  );
  return settings?.logo || "/icon.png";
}

export async function updateLogo(logoPath: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.adminSettings.update({
      where: { id: "singleton" },
      data: { logo: logoPath },
    });
    revalidatePath("/");
    revalidatePath("/gerenciar");
    revalidatePath("/gerenciar/configuracoes");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao atualizar logo" };
  }
}

export async function updateAdminSettings(data: {
  currentPassword: string;
  newUsername?: string;
  newPassword?: string;
  recoveryEmail?: string;
}): Promise<{ success: boolean; error?: string }> {
  const settings = await safePrismaOperation(
    () => prisma.adminSettings.findUnique({
      where: { id: "singleton" },
    }),
    null
  );

  if (!settings) {
    return { success: false, error: "Configuração não encontrada" };
  }

  const valid = await bcrypt.compare(data.currentPassword, settings.passwordHash);
  if (!valid) {
    return { success: false, error: "Senha atual incorreta" };
  }

  const updateData: Record<string, unknown> = {};

  if (data.newUsername && data.newUsername.trim()) {
    updateData.username = data.newUsername.trim();
  }

  if (data.newPassword && data.newPassword.trim()) {
    updateData.passwordHash = await bcrypt.hash(data.newPassword, 10);
  }

  if (data.recoveryEmail !== undefined) {
    updateData.recoveryEmail = data.recoveryEmail.trim() || null;
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.adminSettings.update({
      where: { id: "singleton" },
      data: updateData,
    });
  }

  revalidatePath("/gerenciar/configuracoes");

  return { success: true };
}
