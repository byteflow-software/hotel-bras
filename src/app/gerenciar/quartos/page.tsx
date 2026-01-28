import { AdminLayout } from "@/components/admin";
import { getAllRoomTypesForAdmin } from "@/lib/data/rooms";
import { getAllUnits } from "@/lib/data/rooms";
import { QuartosContent } from "./quartos-content";

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
