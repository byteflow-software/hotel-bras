import { prisma, safePrismaOperation } from "@/lib/prisma";

export async function getUnitsWithRoomTypes() {
  return safePrismaOperation(
    () => prisma.unit.findMany({
      include: {
        roomTypes: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { name: "asc" },
    }),
    []
  );
}

export async function getAllUnits() {
  return safePrismaOperation(
    () => prisma.unit.findMany({
      orderBy: { name: "asc" },
    }),
    []
  );
}

export async function getRoomTypeById(id: string) {
  return safePrismaOperation(
    () => prisma.roomType.findUnique({
      where: { id },
      include: { unit: true },
    }),
    null
  );
}

export async function getAllRoomTypesForAdmin() {
  return safePrismaOperation(
    () => prisma.roomType.findMany({
      include: { unit: true },
      orderBy: [{ unit: { name: "asc" } }, { displayOrder: "asc" }],
    }),
    []
  );
}

export async function getFeaturedRoomTypes(limit = 3) {
  return safePrismaOperation(
    () => prisma.roomType.findMany({
      where: { isActive: true },
      include: { unit: true },
      orderBy: { displayOrder: "asc" },
      take: limit,
    }),
    []
  );
}
