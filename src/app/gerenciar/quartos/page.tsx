import { AdminLayout } from "@/components/admin";
import { getAllRoomTypesForAdmin, getAllUnits } from "@/lib/data/rooms";
import { QuartosContent } from "./quartos-content";

export const dynamic = "force-dynamic";

export default async function AdminQuartosPage() {
  const [rooms, units] = await Promise.all([
    getAllRoomTypesForAdmin(),
    getAllUnits(),
  ]);

  return (
    <AdminLayout>
      <QuartosContent rooms={rooms} units={units} />
    </AdminLayout>
  );
}
