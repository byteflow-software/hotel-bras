import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RoomType } from "@/generated/prisma/client";

interface RoomCardProps {
  room: RoomType;
  unitName?: string;
}

export function RoomCard({ room, unitName }: RoomCardProps) {
  return (
    <Card className="overflow-hidden group hover-lift">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {room.photos[0] ? (
          <Image
            src={room.photos[0]}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            Sem foto
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {unitName && (
          <Badge className="absolute top-3 left-3 bg-white/90 text-[var(--color-primary)]">
            {unitName.replace("Unidade ", "")}
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-2">
          {room.name}
        </h3>
        <p className="text-[var(--color-text-light)] text-sm mb-4 line-clamp-2">
          {room.shortDescription}
        </p>

        {/* Room Info */}
        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-light)] mb-6">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Até {room.maxOccupancy} hóspedes</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-[var(--color-accent)]" />
            <span>{room.size}m²</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-[var(--color-accent)]" />
            <span>{room.beds}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="px-2 py-1 bg-[var(--color-light)] text-[var(--color-text-light)] text-xs rounded"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-1 bg-[var(--color-light)] text-[var(--color-accent)] text-xs rounded">
              +{room.amenities.length - 4}
            </span>
          )}
        </div>

        <Button asChild variant="outline" className="w-full">
          <Link href={`/acomodacoes#${room.slug}`}>Ver detalhes</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
