"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Coffee, UserCheck, Clock, Fingerprint, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UnitEditDialog } from "./unit-edit-dialog";
import type { Unit } from "@/generated/prisma/client";

interface AreasComunsContentProps {
  units: Unit[];
}

export function AreasComunsContent({ units }: AreasComunsContentProps) {
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
          Áreas Comuns
        </h1>
        <p className="text-[var(--color-text-light)]">
          Gerencie as áreas comuns e informações de cada unidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {units.map((unit) => (
          <Card key={unit.id} className="overflow-hidden">
            <div className="relative h-48">
              {unit.commonAreaPhotos[0] ? (
                <Image
                  src={unit.commonAreaPhotos[0]}
                  alt={unit.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--color-light)] flex items-center justify-center text-[var(--color-text-light)]">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {unit.commonAreaPhotos.length > 0 && (
                  <Badge className="bg-black/60 text-white">
                    {unit.commonAreaPhotos.length} foto{unit.commonAreaPhotos.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)] mb-2">
                {unit.name}
              </h3>
              <p className="text-sm text-[var(--color-text-light)] line-clamp-2 mb-3">
                {unit.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {unit.hasBreakfast && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Coffee className="w-3 h-3" />
                    Café da manhã
                  </Badge>
                )}
                {unit.hasInPersonService && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <UserCheck className="w-3 h-3" />
                    Atendimento presencial
                  </Badge>
                )}
                {unit.serviceHours && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Clock className="w-3 h-3" />
                    {unit.serviceHours}
                  </Badge>
                )}
                {unit.entryMethod && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Fingerprint className="w-3 h-3" />
                    {unit.entryMethod}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {unit.commonAreas.slice(0, 3).map((area) => (
                  <span
                    key={area}
                    className="text-xs px-2 py-1 bg-[var(--color-light)] rounded"
                  >
                    {area}
                  </span>
                ))}
                {unit.commonAreas.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-[var(--color-light)] rounded">
                    +{unit.commonAreas.length - 3}
                  </span>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setEditingUnit(unit)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingUnit && (
        <UnitEditDialog
          unit={editingUnit}
          open={!!editingUnit}
          onOpenChange={(open) => {
            if (!open) setEditingUnit(null);
          }}
        />
      )}
    </div>
  );
}
