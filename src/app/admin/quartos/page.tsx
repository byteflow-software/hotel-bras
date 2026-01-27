"use client";

import Image from "next/image";
import { Edit, Plus, Users, Maximize } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/mock";

export default function AdminQuartosPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
              Quartos
            </h1>
            <p className="text-[var(--color-text-light)]">
              Gerencie o catalogo de quartos e conteudo
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Quarto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={room.photos[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)] mb-2">
                  {room.name}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] line-clamp-2 mb-4">
                  {room.shortDescription}
                </p>

                <div className="flex gap-4 text-sm text-[var(--color-text-light)] mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {room.maxOccupancy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {room.size}m²
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs px-2 py-1 bg-[var(--color-light)] rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-[var(--color-light)] rounded">
                      +{room.amenities.length - 3}
                    </span>
                  )}
                </div>

                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
