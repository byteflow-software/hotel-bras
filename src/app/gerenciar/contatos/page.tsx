import { AdminLayout } from "@/components/admin";
import { getContacts } from "./actions";
import { ContatosContent } from "./contatos-content";

export const dynamic = "force-dynamic";

export default async function AdminContatosPage() {
  const contacts = await getContacts();

  return (
    <AdminLayout>
      <ContatosContent contacts={contacts} />
    </AdminLayout>
  );
}
