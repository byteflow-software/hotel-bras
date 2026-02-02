import { MapPin, Train, Bus, Car, Plane, ShoppingBag, Store, Building2, Church } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { GoogleMapBras } from "@/components/landing/GoogleMapBras";
import { unitAddresses } from "@/lib/mock";

export const metadata = {
  title: "Localização | Hotel Brás",
  description: "Saiba como chegar ao Hotel Brás no bairro do Brás, São Paulo.",
};

const units = [
  {
    ...unitAddresses.autonoma,
    lat: -23.52468,
    lng: -46.61913,
  },
  {
    ...unitAddresses.flat,
    lat: -23.5249,
    lng: -46.6195,
  },
];

const directions = [
  {
    icon: Train,
    title: "De Metrô",
    description:
      "Estação Armênia (Linha 1 - Azul), a cerca de 12 minutos a pé. Se você desembarcar na estação Portuguesa-Tietê, basta pegar um ônibus sentido centro na Av. Cruzeiro do Sul — a estação Armênia é a próxima parada.",
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
      "Pela Marginal Tietê, acesse a Av. Cruzeiro do Sul e siga até a Rua Canindé. Pelo centro, siga pela Av. do Estado até a Rua Pedro Vicente e vire na Rua Canindé. Dica: utilize nosso guia de localização para facilitar sua chegada.",
  },
  {
    icon: Plane,
    title: "Do Aeroporto",
    description:
      "De Guarulhos (GRU): você pode pegar o Metrô Linha 13-Jade que sai do aeroporto, fazer baldeação na estação Sé (Linha 1-Azul) e descer na estação Armênia, a 12 min a pé do hotel. De carro, são cerca de 25 km, 35 min via Marginal Tietê. De Congonhas (CGH): cerca de 12 km, 25 min via Av. do Estado.",
  },
];

const nearbyCategories = [
  {
    title: "Feiras",
    icon: Store,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    items: [
      { name: "Feira da Madrugada", distance: "300m" },
      { name: "Feirinha da Concórdia", distance: "1.2km" },
      { name: "Feira Kantuta", distance: "800m" },
    ],
  },
  {
    title: "Shoppings e Galerias",
    icon: ShoppingBag,
    color: "text-red-600",
    bgColor: "bg-red-100",
    items: [
      { name: "Shopping Vautier", distance: "400m" },
      { name: "Shopping Vautier Premium", distance: "450m" },
      { name: "Galeria Pagé Brás", distance: "350m" },
      { name: "Shopping Canindé", distance: "300m" },
      { name: "Shopping Tupan", distance: "400m" },
      { name: "Shopping Azulão", distance: "250m" },
      { name: "Shopping Carnot", distance: "300m" },
      { name: "Shop Elev Brás", distance: "400m" },
      { name: "Shopping Tiers", distance: "450m" },
      { name: "Shopping Porto", distance: "350m" },
      { name: "Shopping New Bancas", distance: "400m" },
      { name: "Shopping Brasmix", distance: "500m" },
      { name: "Shopping K", distance: "900m" },
      { name: "Shopping 25 de Março", distance: "1.8km" },
    ],
  },
  {
    title: "Transporte",
    icon: Train,
    color: "text-green-600",
    bgColor: "bg-green-100",
    items: [
      { name: "Estação Armênia (Metrô L1)", distance: "900m" },
      { name: "Estação Brás (Metrô L3)", distance: "1.5km" },
      { name: "Terminal Tietê", distance: "3km" },
    ],
  },
  {
    title: "Pontos de Interesse",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    items: [
      { name: "Hospital N. Sra. do Pari", distance: "200m" },
      { name: "Mercado Municipal", distance: "2km" },
      { name: "Museu Catavento", distance: "1.5km" },
      { name: "Pinacoteca", distance: "2.5km" },
      { name: "Expo Center Norte", distance: "5km" },
    ],
  },
  {
    title: "Cultura e Religião",
    icon: Church,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    items: [
      { name: "Paróquia Sto. Antônio do Pari", distance: "300m" },
      { name: "Buraco Quente", distance: "700m" },
      { name: "Memorial da Imigração", distance: "1.5km" },
    ],
  },
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
            Localização privilegiada no bairro do Brás, com fácil acesso ao
            metrô e principais pontos de São Paulo.
          </p>
        </div>
      </section>

      {/* Google Map with Pins */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <GoogleMapBras />

          {/* Unit Address Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {units.map((unit) => (
              <div
                key={unit.name}
                className="bg-[var(--color-light)] rounded-2xl p-8"
              >
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
            ))}
          </div>

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
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-4 text-center">
            Pontos de Interesse Próximos
          </h2>
          <p className="text-center text-[var(--color-text-light)] mb-10 max-w-2xl mx-auto">
            O Brás é um dos maiores polos de comércio popular do Brasil. Confira o que você encontra por perto.
          </p>

          <div className="space-y-8">
            {nearbyCategories.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${category.bgColor} rounded-lg`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-primary)]">
                    {category.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {category.items.map((place) => (
                    <div
                      key={place.name}
                      className="bg-white rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-sm text-[var(--color-primary)] mb-1">
                        {place.name}
                      </h4>
                      <span className="text-xs font-medium text-[var(--color-accent)] mt-auto">
                        {place.distance}
                      </span>
                    </div>
                  ))}
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
