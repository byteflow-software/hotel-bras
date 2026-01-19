"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings, customers, promoCodes } from "@/lib/mock";
import { formatCurrency } from "@/lib/utils";

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

  // Calculate stats
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const totalRevenue = confirmedBookings.reduce(
    (sum, b) => sum + b.priceQuote.total,
    0
  );
  const pendingBookings = bookings.filter(
    (b) => b.paymentStatus === "pending"
  ).length;
  const totalCustomers = customers.length;

  const stats = [
    {
      title: "Reservas Confirmadas",
      value: confirmedBookings.length.toString(),
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Receita Total",
      value: formatCurrency(totalRevenue),
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Clientes",
      value: totalCustomers.toString(),
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Taxa de Conversao",
      value: "68%",
      change: "-2%",
      trend: "down",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentBookings = bookings.slice(0, 5);

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
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
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

        {/* Recent Bookings & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Reservas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-light)] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[var(--color-primary)]">
                        {booking.customer.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-light)]">
                        {booking.room.name} - {booking.code}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--color-accent)]">
                        {formatCurrency(booking.priceQuote.total)}
                      </p>
                      <p className="text-xs text-[var(--color-text-light)]">
                        {booking.paymentStatus === "paid"
                          ? "Pago"
                          : "Pendente"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informacoes Rapidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-semibold text-yellow-800">
                  {pendingBookings} reservas aguardando pagamento
                </p>
                <p className="text-sm text-yellow-700">
                  Acompanhe os pagamentos pendentes
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">
                  {promoCodes.filter((p) => p.active).length} cupons ativos
                </p>
                <p className="text-sm text-green-700">
                  Promocoes em andamento no sistema
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800">Check-ins hoje: 2</p>
                <p className="text-sm text-blue-700">
                  Hospedes chegando hoje
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
