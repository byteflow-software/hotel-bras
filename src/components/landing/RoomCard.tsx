import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Room } from "@/types";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={room.photos[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
            <span>Ate {room.maxOccupancy} hospedes</span>
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
          <Link href={`/acomodacoes#${room.id}`}>Ver detalhes</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
