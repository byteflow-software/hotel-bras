import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomCard } from "./RoomCard";
import { rooms } from "@/lib/mock";

export function FeaturedRooms() {
  // Show first 3 rooms as featured
  const featuredRooms = rooms.slice(0, 3);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Nossas Acomodacoes
            </h2>
            <p className="text-[var(--color-text-light)] max-w-xl">
              Quartos elegantes e confortaveis, pensados para proporcionar o
              maximo de bem-estar durante sua estadia.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/acomodacoes">
              Ver todas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
