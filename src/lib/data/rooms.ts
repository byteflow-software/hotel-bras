import { prisma } from "@/lib/prisma";

export async function getUnitsWithRoomTypes() {
  return prisma.unit.findMany({
    include: {
      roomTypes: {
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getAllUnits() {
  return prisma.unit.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getRoomTypeById(id: string) {
  return prisma.roomType.findUnique({
    where: { id },
    include: { unit: true },
  });
}

export async function getAllRoomTypesForAdmin() {
  return prisma.roomType.findMany({
    include: { unit: true },
    orderBy: [{ unit: { name: "asc" } }, { displayOrder: "asc" }],
  });
}

export async function getFeaturedRoomTypes(limit = 3) {
  return prisma.roomType.findMany({
    where: { isActive: true },
    include: { unit: true },
    orderBy: { displayOrder: "asc" },
    take: limit,
  });
}
