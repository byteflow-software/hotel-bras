"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function updateUnit(
  id: string,
  data: {
    name?: string;
    description?: string;
    hasBreakfast?: boolean;
    hasInPersonService?: boolean;
    serviceHours?: string | null;
    entryMethod?: string | null;
    commonAreas?: string[];
    commonAreaPhotos?: string[];
  }
) {
  const unit = await prisma.unit.update({
    where: { id },
    data: {
      ...data,
      slug: data.name
        ? data.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : undefined,
    },
  });

  revalidatePath("/gerenciar/areas-comuns");
  revalidatePath("/acomodacoes");
  revalidatePath("/");

  return unit;
}

export async function uploadCommonAreaPhoto(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("Nenhum arquivo enviado");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = join(process.cwd(), "public", "rooms", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const timestamp = Date.now();
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const filename = `${timestamp}-${safeName}`;
  const filepath = join(uploadsDir, filename);

  await writeFile(filepath, buffer);

  return `/rooms/uploads/${filename}`;
}
