import {
  Bed,
  MessageSquare,
  TrendingUp,
  Phone,
} from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getUnreadContactsCount, getContacts } from "./contatos/actions";
import { getAllRoomTypesForAdmin } from "@/lib/data/rooms";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [unreadContacts, allContacts, rooms] = await Promise.all([
    getUnreadContactsCount(),
    getContacts(),
    getAllRoomTypesForAdmin(),
  ]);

  const totalContacts = allContacts.length;
  const totalRooms = rooms.length;

  const stats = [
    {
      title: "Quartos Cadastrados",
      value: totalRooms.toString(),
      icon: Bed,
      color: "bg-blue-500",
    },
    {
      title: "Mensagens",
      value: totalContacts.toString(),
      subtitle: unreadContacts > 0 ? `${unreadContacts} não lidas` : undefined,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      title: "Taxa de Ocupação",
      value: "72%",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Atendimentos Hoje",
      value: "8",
      icon: Phone,
      color: "bg-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
            Dashboard
          </h1>
          <p className="text-[var(--color-text-light)]">
            Bem-vindo ao painel administrativo do Hotel Brás
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-[var(--color-primary)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--color-text-light)]">
                    {stat.title}
                  </p>
                  {stat.subtitle && (
                    <p className="text-xs text-orange-500 font-medium mt-1">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                href="/gerenciar/quartos"
                className="w-full flex items-center justify-between p-3 bg-[var(--color-light)] rounded-lg hover:bg-[var(--color-light)]/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-[var(--color-accent)]" />
                  <span className="font-medium text-[var(--color-primary)]">
                    Gerenciar Quartos
                  </span>
                </div>
                <span className="text-sm text-[var(--color-text-light)]">
                  Editar fotos, descrições e comodidades
                </span>
              </Link>
              <Link
                href="/gerenciar/contatos"
                className="w-full flex items-center justify-between p-3 bg-[var(--color-light)] rounded-lg hover:bg-[var(--color-light)]/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-[var(--color-accent)]" />
                  <span className="font-medium text-[var(--color-primary)]">
                    Ver Contatos
                  </span>
                </div>
                <span className="text-sm text-[var(--color-text-light)]">
                  {unreadContacts > 0
                    ? `${unreadContacts} mensagens não lidas`
                    : `${totalContacts} mensagens recebidas`}
                </span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800">2 Unidades</p>
                <p className="text-sm text-blue-700">
                  Autônoma e Flat operacionais
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">{totalRooms} Tipos de Quarto</p>
                <p className="text-sm text-green-700">
                  Disponíveis para hóspedes
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-semibold text-purple-800">
                  {totalContacts} mensagens recebidas
                </p>
                <p className="text-sm text-purple-700">
                  {unreadContacts > 0
                    ? `${unreadContacts} aguardando resposta`
                    : "Todas respondidas"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
