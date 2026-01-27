"use client";

import { useState } from "react";
import { Search, Download, Mail, Phone } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customers } from "@/lib/mock";
import { formatDate } from "@/lib/utils";

export default function AdminClientesPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  const exportCSV = () => {
    const headers = ["Nome", "Email", "Telefone", "Cadastro"];
    const rows = filteredCustomers.map((c) => [
      c.name,
      c.email,
      c.phone,
      formatDate(c.createdAt),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clientes.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Clientes
            </h1>
            <p className="text-[var(--color-text-light)]">
              Base de clientes do hotel
            </p>
          </div>
          <Button onClick={exportCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-light)]" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-light)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Cliente
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Contato
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-primary)]">
                      Cadastro
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-[var(--color-primary)]">
                      Acoes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-[var(--color-lighter)]"
                    >
                      <td className="px-4 py-4">
                        <p className="font-medium text-[var(--color-primary)]">
                          {customer.name}
                        </p>
                        {customer.document && (
                          <p className="text-sm text-[var(--color-text-light)]">
                            {customer.document}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-[var(--color-text-light)]" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[var(--color-text-light)]">
                        {formatDate(customer.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-[var(--color-text-light)] text-center">
          Total: {filteredCustomers.length} clientes
        </p>
      </div>
    </AdminLayout>
  );
}
