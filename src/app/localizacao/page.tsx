import { MapPin, Train, Bus, Car, Plane } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { hotelInfo } from "@/lib/mock";

export const metadata = {
  title: "Localizacao | Hotel Bras",
  description: "Saiba como chegar ao Hotel Bras no coracao de Sao Paulo.",
};

const directions = [
  {
    icon: Train,
    title: "De Metro",
    description:
      "Desembarque na estacao Bras (Linha 3 - Vermelha). O hotel fica a apenas 300 metros da estacao, cerca de 4 minutos a pe.",
  },
  {
    icon: Bus,
    title: "De Onibus",
    description:
      "Diversas linhas de onibus passam pela regiao. O ponto mais proximo fica na Av. Rangel Pestana, a 200 metros do hotel.",
  },
  {
    icon: Car,
    title: "De Carro",
    description:
      "Pela Marginal Tiete, saia na Ponte da Casa Verde e siga pela Av. Cruzeiro do Sul. Ou pelo centro, siga pela Av. do Estado. Estacionamento privativo disponivel.",
  },
  {
    icon: Plane,
    title: "Do Aeroporto",
    description:
      "De Guarulhos (GRU): 30 km, cerca de 40 min via Marginal Tiete. De Congonhas (CGH): 12 km, cerca de 25 min via Av. do Estado.",
  },
];

const nearby = [
  { name: "Metro Bras", distance: "300m", type: "Transporte" },
  { name: "Mercado Municipal", distance: "1.5km", type: "Atracao" },
  { name: "Pinacoteca", distance: "2km", type: "Cultura" },
  { name: "Praca da Se", distance: "2km", type: "Atracao" },
  { name: "Museu da Lingua Portuguesa", distance: "1.8km", type: "Cultura" },
  { name: "Rua 25 de Marco", distance: "1.2km", type: "Comercio" },
  { name: "MASP", distance: "5km", type: "Cultura" },
  { name: "Parque Ibirapuera", distance: "8km", type: "Lazer" },
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
            Localizacao privilegiada no coracao do Bras, com facil acesso ao
            transporte publico e principais pontos de Sao Paulo.
          </p>
        </div>
      </section>

      {/* Map and Address */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
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

            {/* Address and Directions */}
            <div>
              <div className="bg-[var(--color-light)] rounded-2xl p-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-secondary)] rounded-xl">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-2">
                      {hotelInfo.name}
                    </h2>
                    <p className="text-[var(--color-text)]">
                      {hotelInfo.address}
                      <br />
                      {hotelInfo.city} - {hotelInfo.state}
                      <br />
                      CEP: {hotelInfo.zipCode}
                    </p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hotelInfo.coordinates.lat},${hotelInfo.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-[var(--color-accent)] font-medium hover:underline"
                    >
                      Abrir no Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6">
                Como Chegar
              </h3>
              <div className="space-y-6">
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
