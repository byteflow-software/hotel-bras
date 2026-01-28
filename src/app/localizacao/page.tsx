import { MapPin, Train, Bus, Car, Plane } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { hotelInfo, unitAddresses } from "@/lib/mock";

export const metadata = {
  title: "Localização | Hotel Brás",
  description: "Saiba como chegar ao Hotel Brás no bairro do Canindé, São Paulo.",
};

const units = [
  {
    ...unitAddresses.autonoma,
    lat: -23.52468,
    lng: -46.61913,
  },
  {
    ...unitAddresses.flat,
    lat: -23.52490,
    lng: -46.61950,
  },
];

const directions = [
  {
    icon: Train,
    title: "De Metrô",
    description:
      "Estação Armênia (Linha 1 - Azul), a cerca de 12 minutos a pé. Também é possível descer na estação Portuguesa-Tietê (Linha 1 - Azul), a cerca de 15 minutos a pé.",
  },
  {
    icon: Bus,
    title: "De Ônibus",
    description:
      "Diversas linhas de ônibus passam pela Rua Canindé e pela Av. Cruzeiro do Sul. Linhas vindas do Terminal Tietê e do centro atendem a região.",
  },
  {
    icon: Car,
    title: "De Carro",
    description:
      "Pela Marginal Tietê, acesse a Av. Cruzeiro do Sul e siga até a Rua Canindé. Pelo centro, siga pela Av. do Estado até a Rua Pedro Vicente e vire na Rua Canindé.",
  },
  {
    icon: Plane,
    title: "Do Aeroporto",
    description:
      "De Guarulhos (GRU): cerca de 25 km, 35 min via Marginal Tietê. De Congonhas (CGH): cerca de 12 km, 25 min via Av. do Estado.",
  },
];

const nearby = [
  { name: "Estação Armênia (Metrô)", distance: "900m", type: "Transporte" },
  { name: "Shopping D", distance: "500m", type: "Comércio" },
  { name: "Estádio do Canindé", distance: "600m", type: "Esporte" },
  { name: "Museu Catavento", distance: "1.5km", type: "Cultura" },
  { name: "Feira Kantuta", distance: "800m", type: "Cultura" },
  { name: "Feira da Madrugada", distance: "1.2km", type: "Comércio" },
  { name: "Rua 25 de Março", distance: "2km", type: "Comércio" },
  { name: "Mercado Municipal", distance: "2km", type: "Atração" },
  { name: "Pinacoteca", distance: "2.5km", type: "Cultura" },
];

export default function LocalizacaoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Como Chegar
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Localização privilegiada no bairro do Canindé, com fácil acesso ao
            metrô e principais pontos de São Paulo.
          </p>
        </div>
      </section>

      {/* Units with Maps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {units.map((unit, index) => (
            <div
              key={unit.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Map */}
              <div className={`relative h-[400px] rounded-2xl overflow-hidden shadow-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(unit.address + ", " + unit.city + " - " + unit.state)}&zoom=17`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Localização - ${unit.name}`}
                />
              </div>

              {/* Address */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-[var(--color-light)] rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[var(--color-secondary)] rounded-xl">
                      <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-2">
                        {unit.name}
                      </h2>
                      <p className="text-[var(--color-text)]">
                        {unit.address}
                        <br />
                        {unit.city} - {unit.state}
                        <br />
                        CEP: {unit.zipCode}
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(unit.address + ", " + unit.city + " " + unit.state)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[var(--color-accent)] font-medium hover:underline"
                      >
                        Abrir no Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Directions */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6">
              Como Chegar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {directions.map((dir) => (
                <div key={dir.title} className="flex gap-4">
                  <div className="p-2 bg-[var(--color-secondary-light)] rounded-lg h-fit">
                    <dir.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-primary)] mb-1">
                      {dir.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {dir.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-8 text-center">
            Pontos de Interesse Proximos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearby.map((place) => (
              <div
                key={place.name}
                className="bg-white rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-[var(--color-primary)]">
                    {place.name}
                  </h4>
                  <span className="text-xs text-[var(--color-text-light)]">
                    {place.type}
                  </span>
                </div>
                <span className="text-[var(--color-accent)] font-medium">
                  {place.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
