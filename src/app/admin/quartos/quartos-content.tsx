"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Plus, Users, Maximize, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RoomEditDialog } from "./room-edit-dialog";
import { RoomCreateDialog } from "./room-create-dialog";
import { deleteRoomType } from "./actions";
import type { Unit, RoomType } from "@/generated/prisma/client";

type RoomWithUnit = RoomType & { unit: Unit };

interface QuartosContentProps {
  rooms: RoomWithUnit[];
  units: Unit[];
}

export function QuartosContent({ rooms, units }: QuartosContentProps) {
  const [editingRoom, setEditingRoom] = useState<RoomWithUnit | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este quarto?")) return;
    setDeleting(id);
    try {
      await deleteRoomType(id);
    } catch {
      alert("Erro ao excluir quarto");
    }
    setDeleting(null);
  }

  function renderRoomGrid(filteredRooms: RoomWithUnit[]) {
    if (filteredRooms.length === 0) {
      return (
        <p className="text-center text-[var(--color-text-light)] py-8">
          Nenhum quarto encontrado nesta unidade.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="relative h-48">
              {room.photos[0] ? (
                <Image
                  src={room.photos[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--color-light)] flex items-center justify-center text-[var(--color-text-light)]">
                  Sem foto
                </div>
              )}
              {!room.isActive && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  Inativo
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)]">
                  {room.name}
                </h3>
                <Badge variant="outline" className="text-xs shrink-0">
                  {room.unit.name.replace("Unidade ", "")}
                </Badge>
              </div>
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

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditingRoom(room)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:border-red-300"
                  onClick={() => handleDelete(room.id)}
                  disabled={deleting === room.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
            Quartos
          </h1>
          <p className="text-[var(--color-text-light)]">
            Gerencie o catálogo de quartos e conteúdo
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Quarto
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos ({rooms.length})</TabsTrigger>
          {units.map((unit) => {
            const count = rooms.filter((r) => r.unitId === unit.id).length;
            return (
              <TabsTrigger key={unit.id} value={unit.id}>
                {unit.name.replace("Unidade ", "")} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all">{renderRoomGrid(rooms)}</TabsContent>
        {units.map((unit) => (
          <TabsContent key={unit.id} value={unit.id}>
            {renderRoomGrid(rooms.filter((r) => r.unitId === unit.id))}
          </TabsContent>
        ))}
      </Tabs>

      {editingRoom && (
        <RoomEditDialog
          room={editingRoom}
          units={units}
          open={!!editingRoom}
          onOpenChange={(open) => {
            if (!open) setEditingRoom(null);
          }}
        />
      )}

      <RoomCreateDialog
        units={units}
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
