import { NextResponse } from "next/server";
import { prisma, safePrismaOperation } from "@/lib/prisma";

export async function GET() {
  const settings = await safePrismaOperation(
    () =>
      prisma.adminSettings.findUnique({
        where: { id: "singleton" },
        select: { logo: true },
      }),
    null
  );

  return NextResponse.json({
    logo: settings?.logo || "/icon.png",
  });
}
