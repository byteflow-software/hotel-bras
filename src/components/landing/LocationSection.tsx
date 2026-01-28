import Link from "next/link";
import { MapPin, Train, ShoppingBag, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotelInfo, unitAddresses } from "@/lib/mock";

const nearbyPlaces = [
  {
    icon: Train,
    name: "Metrô Armênia",
    distance: "900m",
    description: "Linha 1 - Azul, 12 min a pé",
  },
  {
    icon: ShoppingBag,
    name: "Shopping D",
    distance: "500m",
    description: "Av. Cruzeiro do Sul, 1100",
  },
  {
    icon: Building,
    name: "Museu Catavento",
    distance: "1.5km",
    description: "Ciência e tecnologia interativa",
  },
];

export function LocationSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg animate-slide-in-left">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(unitAddresses.autonoma.address + ", " + unitAddresses.autonoma.city + " - " + unitAddresses.autonoma.state)}&zoom=17`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Hotel Brás"
            />
          </div>

          {/* Info */}
          <div className="animate-slide-in-right">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Localização Privilegiada
            </h2>
            <p className="text-[var(--color-text-light)] mb-8">
              No bairro do Canindé, com fácil acesso ao metrô, Shopping D e aos
              principais pontos de interesse de São Paulo.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-4 bg-[var(--color-light)] rounded-xl">
                <MapPin className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-primary)]">
                    {unitAddresses.autonoma.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-light)]">
                    {unitAddresses.autonoma.address} - CEP: {unitAddresses.autonoma.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[var(--color-light)] rounded-xl">
                <MapPin className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--color-primary)]">
                    {unitAddresses.flat.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-light)]">
                    {unitAddresses.flat.address} - CEP: {unitAddresses.flat.zipCode}
                  </p>
                </div>
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
