"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bed,
  Users,
  TrendingUp,
  Phone,
} from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customers } from "@/lib/mock";
import { rooms } from "@/lib/mock";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mock authentication check
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      // Auto-login for demo
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const totalCustomers = customers.length;
  const totalRooms = rooms.length;

  const stats = [
    {
      title: "Quartos Cadastrados",
      value: totalRooms.toString(),
      icon: Bed,
      color: "bg-blue-500",
    },
    {
      title: "Clientes",
      value: totalCustomers.toString(),
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Taxa de Ocupacao",
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
            Bem-vindo ao painel administrativo do Hotel Bras
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quartos Disponiveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rooms.slice(0, 5).map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-light)] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[var(--color-primary)]">
                        {room.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-light)]">
                        Ate {room.maxOccupancy} hospedes - {room.size}m²
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informacoes Rapidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800">Check-ins hoje: 2</p>
                <p className="text-sm text-blue-700">
                  Hospedes chegando hoje
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">Check-outs hoje: 1</p>
                <p className="text-sm text-green-700">
                  Hospedes saindo hoje
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-semibold text-purple-800">
                  {totalCustomers} clientes cadastrados
                </p>
                <p className="text-sm text-purple-700">
                  Base de clientes do hotel
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
