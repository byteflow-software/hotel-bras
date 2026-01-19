"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, Mail } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bookings } from "@/lib/mock";
import { formatCurrency, formatDateLong } from "@/lib/utils";
import { Booking } from "@/types";

export default function AdminReservasPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.code.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === "confirmed" && booking.paymentStatus === "paid") {
      return <Badge variant="success">Confirmada</Badge>;
    }
    if (booking.paymentStatus === "pending") {
      return <Badge variant="warning">Aguardando</Badge>;
    }
    if (booking.status === "cancelled") {
      return <Badge variant="destructive">Cancelada</Badge>;
    }
    return <Badge variant="secondary">{booking.status}</Badge>;
  };

  const exportCSV = () => {
    const headers = [
      "Codigo",
      "Cliente",
      "Email",
      "Quarto",
      "Check-in",
      "Check-out",
      "Valor",
      "Status",
    ];
    const rows = filteredBookings.map((b) => [
      b.code,
      b.customer.name,
      b.customer.email,
      b.room.name,
      formatDateLong(b.checkIn),
      formatDateLong(b.checkOut),
      b.priceQuote.total,
      b.status,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reservas.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Reservas
            </h1>
            <p className="text-[var(--color-text-light)]">
              Gerencie todas as reservas do canal direto
            </p>
          </div>
          <Button onClick={exportCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
                <Input
                  placeholder="Buscar por codigo, nome ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-light)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Codigo
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Cliente
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Quarto
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Periodo
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Valor
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-[var(--color-primary)]">
                      Acoes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[var(--color-lighter)]">
                      <td className="px-4 py-4 font-mono text-sm">
                        {booking.code}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-[var(--color-primary)]">
                          {booking.customer.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-light)]">
                          {booking.customer.email}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm">{booking.room.name}</td>
                      <td className="px-4 py-4 text-sm">
                        <p>{formatDateLong(booking.checkIn)}</p>
                        <p className="text-[var(--color-text-light)]">
                          {formatDateLong(booking.checkOut)}
                        </p>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[var(--color-accent)]">
                        {formatCurrency(booking.priceQuote.total)}
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(booking)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>
                                  Reserva {booking.code}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Cliente</h4>
                                  <p>{booking.customer.name}</p>
                                  <p className="text-sm text-[var(--color-text-light)]">
                                    {booking.customer.email}
                                  </p>
                                  <p className="text-sm text-[var(--color-text-light)]">
                                    {booking.customer.phone}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Acomodacao
                                  </h4>
                                  <p>{booking.room.name}</p>
                                  <p className="text-sm text-[var(--color-text-light)]">
                                    {booking.ratePlan.name}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Periodo</h4>
                                  <p>
                                    {formatDateLong(booking.checkIn)} -{" "}
                                    {formatDateLong(booking.checkOut)}
                                  </p>
                                  <p className="text-sm text-[var(--color-text-light)]">
                                    {booking.priceQuote.nights} noites
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">
                                    Pagamento
                                  </h4>
                                  <p className="text-lg font-bold text-[var(--color-accent)]">
                                    {formatCurrency(booking.priceQuote.total)}
                                  </p>
                                  <p className="text-sm">
                                    {booking.paymentMethod === "pix"
                                      ? "Pix"
                                      : "Cartao"}{" "}
                                    -{" "}
                                    {booking.paymentStatus === "paid"
                                      ? "Pago"
                                      : "Pendente"}
                                  </p>
                                </div>
                                {booking.notes && (
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Observacoes
                                    </h4>
                                    <p className="text-sm">{booking.notes}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
