import { AdminLayout } from "@/components/admin";
import { getAllUnits } from "@/lib/data/rooms";
import { AreasComunsContent } from "./areas-comuns-content";

export const dynamic = "force-dynamic";

export default async function AdminAreasComunsPage() {
  const units = await getAllUnits();

  return (
    <AdminLayout>
      <AreasComunsContent units={units} />
    </AdminLayout>
  );
}
