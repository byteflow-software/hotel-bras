import { AdminLayout } from "@/components/admin";
import { getLoanItems } from "./actions";
import { ItensContent } from "./itens-content";

export const dynamic = "force-dynamic";

export default async function AdminItensDisponiveisPage() {
  const items = await getLoanItems();

  return (
    <AdminLayout>
      <ItensContent items={items} />
    </AdminLayout>
  );
}
