"use server";

import { revalidatePath } from "next/cache";
import { prisma, safePrismaOperation } from "@/lib/prisma";

export async function getLoanItems() {
  return safePrismaOperation(
    () => prisma.loanItem.findMany({
      orderBy: { displayOrder: "asc" },
    }),
    []
  );
}

export async function getActiveLoanItems() {
  return safePrismaOperation(
    () => prisma.loanItem.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
    []
  );
}

export async function createLoanItem(data: {
  name: string;
  description: string;
  icon: string;
}) {
  const maxOrder = await safePrismaOperation(
    () => prisma.loanItem.aggregate({
      _max: { displayOrder: true },
    }),
    { _max: { displayOrder: 0 } }
  );

  const item = await prisma.loanItem.create({
    data: {
      ...data,
      displayOrder: (maxOrder._max.displayOrder ?? 0) + 1,
    },
  });

  revalidatePath("/gerenciar/itens-disponiveis");
  revalidatePath("/emprestimos");

  return item;
}

export async function updateLoanItem(
  id: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    isActive?: boolean;
    displayOrder?: number;
  }
) {
  const item = await prisma.loanItem.update({
    where: { id },
    data,
  });

  revalidatePath("/gerenciar/itens-disponiveis");
  revalidatePath("/emprestimos");

  return item;
}

export async function deleteLoanItem(id: string) {
  await prisma.loanItem.delete({
    where: { id },
  });

  revalidatePath("/gerenciar/itens-disponiveis");
  revalidatePath("/emprestimos");
}

export async function reorderLoanItems(items: { id: string; displayOrder: number }[]) {
  await Promise.all(
    items.map((item) =>
      prisma.loanItem.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      })
    )
  );

  revalidatePath("/gerenciar/itens-disponiveis");
  revalidatePath("/emprestimos");
}
