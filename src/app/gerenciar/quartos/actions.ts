"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function updateRoomType(
  id: string,
  data: {
    name?: string;
    unitId?: string;
    description?: string;
    shortDescription?: string;
    photos?: string[];
    maxOccupancy?: number;
    beds?: string;
    size?: number;
    amenities?: string[];
    hasKitchen?: boolean;
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  const room = await prisma.roomType.update({
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

  revalidatePath("/gerenciar/quartos");
  revalidatePath("/acomodacoes");
  revalidatePath("/");

  return room;
}

export async function createRoomType(data: {
  name: string;
  unitId: string;
  description: string;
  shortDescription: string;
  photos: string[];
  maxOccupancy: number;
  beds: string;
  size: number;
  amenities: string[];
  hasKitchen: boolean;
  displayOrder: number;
  isActive: boolean;
}) {
  const slug = data.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const room = await prisma.roomType.create({
    data: {
      ...data,
      slug,
    },
  });

  revalidatePath("/gerenciar/quartos");
  revalidatePath("/acomodacoes");
  revalidatePath("/");

  return room;
}

export async function deleteRoomType(id: string) {
  await prisma.roomType.delete({
    where: { id },
  });

  revalidatePath("/gerenciar/quartos");
  revalidatePath("/acomodacoes");
  revalidatePath("/");
}

export async function uploadRoomPhoto(formData: FormData) {
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
