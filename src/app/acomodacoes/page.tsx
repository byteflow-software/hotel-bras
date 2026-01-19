import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Bed, Check } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { rooms } from "@/lib/mock";
import { formatCurrency } from "@/lib/utils";
import { getMinPrice } from "@/lib/mock";

export const metadata = {
  title: "Acomodacoes | Hotel Bras",
  description: "Conheca nossos quartos e suites. Conforto e elegancia para sua estadia em Sao Paulo.",
};

export default function AcomodacoesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Nossas Acomodacoes
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Quartos e suites projetados para proporcionar o maximo conforto durante sua
            estadia. Escolha a opcao perfeita para voce.
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                id={room.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Images */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={room.photos[0]}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 text-base px-4 py-2">
                      A partir de {formatCurrency(getMinPrice(room.id))}/noite
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {room.photos.slice(1, 3).map((photo, i) => (
                      <div
                        key={i}
                        className="relative h-32 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={photo}
                          alt={`${room.name} - Foto ${i + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4">
                    {room.name}
                  </h2>
                  <p className="text-[var(--color-text-light)] mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Info */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-[var(--color-text)]">
                      <Users className="w-5 h-5 text-[var(--color-accent)]" />
                      <span>Ate {room.maxOccupancy} hospedes</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text)]">
                      <Maximize className="w-5 h-5 text-[var(--color-accent)]" />
                      <span>{room.size}m²</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--color-text)]">
                      <Bed className="w-5 h-5 text-[var(--color-accent)]" />
                      <span>{room.beds}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <h3 className="font-semibold text-[var(--color-primary)] mb-3">
                    Comodidades
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-light)]"
                      >
                        <Check className="w-4 h-4 text-[var(--color-accent)]" />
                        {amenity}
                      </div>
                    ))}
                  </div>

                  <Button asChild size="lg">
                    <Link href={`/reservas?room=${room.id}`}>
                      Reservar este quarto
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
