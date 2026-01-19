"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { promoCodes } from "@/lib/mock";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function AdminCuponsPage() {
  const activeCodes = promoCodes.filter((p) => p.active);
  const inactiveCodes = promoCodes.filter((p) => !p.active);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Cupons de Desconto
            </h1>
            <p className="text-[var(--color-text-light)]">
              Gerencie promocoes e codigos de desconto
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cupom
          </Button>
        </div>

        {/* Active Coupons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Cupons Ativos ({activeCodes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCodes.map((promo) => (
                <div
                  key={promo.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--color-light)] rounded-lg gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono font-bold text-lg text-[var(--color-accent)]">
                        {promo.code}
                      </span>
                      <Badge variant="success">Ativo</Badge>
                    </div>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {promo.description}
                    </p>
                    <p className="text-xs text-[var(--color-text-light)] mt-1">
                      Valido: {formatDate(promo.validFrom)} - {formatDate(promo.validTo)}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--color-primary)]">
                        {promo.type === "percentage"
                          ? `${promo.value}%`
                          : formatCurrency(promo.value)}
                      </p>
                      <p className="text-xs text-[var(--color-text-light)]">
                        {promo.type === "percentage" ? "Desconto" : "Valor fixo"}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold">
                        {promo.usedCount}
                        {promo.usageLimit && `/${promo.usageLimit}`}
                      </p>
                      <p className="text-xs text-[var(--color-text-light)]">Usos</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inactive Coupons */}
        {inactiveCodes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--color-text-light)]">
                <X className="w-5 h-5" />
                Cupons Inativos ({inactiveCodes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-light)]">
                Nenhum cupom inativo no momento.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">
              Dicas para Cupons
            </h3>
            <ul className="text-sm text-[var(--color-text-light)] space-y-1">
              <li>- Use codigos faceis de lembrar (ex: VERAO20, PRIMEIRA10)</li>
              <li>- Defina um limite de uso para controlar o impacto financeiro</li>
              <li>- Cupons com prazo curto criam senso de urgencia</li>
              <li>- Acompanhe o uso para medir efetividade das campanhas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
