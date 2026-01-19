import Link from "next/link";
import { MapPin, Train, ShoppingBag, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/lib/mock";

const nearbyPlaces = [
  {
    icon: Train,
    name: "Metro Bras",
    distance: "300m",
    description: "Estacao de metro a poucos passos",
  },
  {
    icon: ShoppingBag,
    name: "Comercio Local",
    distance: "100m",
    description: "Maior polo de comercio popular",
  },
  {
    icon: Building,
    name: "Centro Historico",
    distance: "2km",
    description: "Praca da Se e Catedral",
  },
];

export function LocationSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5!2d${hotelInfo.coordinates.lng}!3d${hotelInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzUxLjAiUyA0NsKwMzYnNTYuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizacao do Hotel Bras"
            />
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Localizacao Privilegiada
            </h2>
            <p className="text-[var(--color-text-light)] mb-8">
              No coracao do bairro do Bras, com facil acesso ao transporte publico
              e aos principais pontos de interesse de Sao Paulo.
            </p>

            <div className="flex items-start gap-3 mb-8 p-4 bg-[var(--color-light)] rounded-xl">
              <MapPin className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-[var(--color-primary)]">
                  {hotelInfo.address}
                </p>
                <p className="text-[var(--color-text-light)]">
                  {hotelInfo.city} - {hotelInfo.state}, {hotelInfo.zipCode}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-[var(--color-primary)] mb-4">
              Pontos de Interesse Proximos
            </h3>
            <div className="space-y-4">
              {nearbyPlaces.map((place) => (
                <div key={place.name} className="flex items-start gap-4">
                  <div className="p-2 bg-[var(--color-secondary-light)] rounded-lg">
                    <place.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--color-primary)]">
                        {place.name}
                      </span>
                      <span className="text-sm text-[var(--color-accent)]">
                        {place.distance}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {place.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="mt-8">
              <Link href="/localizacao">Como Chegar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
