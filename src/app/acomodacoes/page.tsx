import { Users, Maximize, Bed, Check, Coffee, User, Clock } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { Badge } from "@/components/ui/badge";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { getUnitsWithRoomTypes } from "@/lib/data/rooms";

export const metadata = {
  title: "Acomodações | Hotel Brás",
  description:
    "Conheça nossos quartos e acomodações. Duas unidades com opções para todos os perfis de hóspede.",
};

export default async function AcomodacoesPage() {
  const units = await getUnitsWithRoomTypes();

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Nossas Acomodações
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Duas unidades com quartos projetados para proporcionar o máximo
            conforto durante sua estadia. Escolha a opção perfeita para você.
          </p>
        </div>
      </section>

      {/* Units */}
      {units.map((unit) => (
        <section key={unit.id} className="py-16 even:bg-[var(--color-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Unit Header */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                {unit.name}
              </h2>
              <p className="text-[var(--color-text-light)] max-w-3xl mb-4 leading-relaxed">
                {unit.description}
              </p>

              {/* Unit badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {unit.hasBreakfast && (
                  <Badge className="bg-[var(--color-accent)] text-white gap-1.5 py-1.5 px-3">
                    <Coffee className="w-3.5 h-3.5" />
                    Café da manhã incluso
                  </Badge>
                )}
                {unit.hasInPersonService && unit.serviceHours && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 py-1.5 px-3"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Atendimento {unit.serviceHours}
                  </Badge>
                )}
                {!unit.hasInPersonService && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 py-1.5 px-3"
                  >
                    <User className="w-3.5 h-3.5" />
                    Unidade autônoma
                  </Badge>
                )}
                {unit.entryMethod && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 py-1.5 px-3"
                  >
                    {unit.entryMethod}
                  </Badge>
                )}
              </div>

              {/* Common Areas */}
              {unit.commonAreas.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-[var(--color-primary)] mb-2 text-sm uppercase tracking-wide">
                    Áreas comuns
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {unit.commonAreas.map((area) => (
                      <span
                        key={area}
                        className="text-sm px-3 py-1 bg-white border border-[var(--border)] rounded-full text-[var(--color-text-light)]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Room Types */}
            <div className="space-y-24">
              {unit.roomTypes.map((room, index) => (
                <div
                  key={room.id}
                  id={room.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                >
                  {/* Images */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <ImageCarousel photos={room.photos} alt={room.name} />
                  </div>

                  {/* Info */}
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
                        {room.name}
                      </h3>
                      {room.hasKitchen && (
                        <Badge className="bg-[var(--color-secondary)] text-white">
                          Com cozinha
                        </Badge>
                      )}
                    </div>
                    <p className="text-[var(--color-text-light)] mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Info */}
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2 text-[var(--color-text)]">
                        <Users className="w-5 h-5 text-[var(--color-accent)]" />
                        <span>Até {room.maxOccupancy} hóspedes</span>
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
                    <h4 className="font-semibold text-[var(--color-primary)] mb-3">
                      Comodidades
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
