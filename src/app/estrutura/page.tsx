import Image from "next/image";
import {
  Wifi,
  Coffee,
  Car,
  Clock,
  Wind,
  Lock,
  Shirt,
  UtensilsCrossed,
  Dumbbell,
  Briefcase,
} from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { services, hotelInfo } from "@/lib/mock";

export const metadata = {
  title: "Estrutura e Servicos | Hotel Bras",
  description: "Conheca a estrutura completa e os servicos oferecidos pelo Hotel Bras.",
};

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Car: <Car className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />,
  Lock: <Lock className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  UtensilsCrossed: <UtensilsCrossed className="w-8 h-8" />,
};

const facilities = [
  {
    name: "Recepcao",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    description: "Nossa recepcao funciona 24 horas para atender voce a qualquer momento.",
  },
  {
    name: "Restaurante",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    description: "Cafe da manha completo com opcoes saudaveis e sabores regionais.",
  },
  {
    name: "Business Center",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "Espaco equipado para reunioes e trabalho com internet de alta velocidade.",
  },
  {
    name: "Estacionamento",
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800",
    description: "Estacionamento privativo com seguranca 24 horas e servico de manobrista.",
  },
];

export default function EstruturaPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Estrutura e Servicos
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Tudo o que voce precisa para uma estadia confortavel e produtiva em Sao Paulo.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-12 text-center">
            Nossas Instalacoes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-[var(--color-text-light)]">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-12 text-center">
            Servicos Disponiveis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-primary)] mb-4">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--color-text-light)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-8 text-center">
            Horarios
          </h2>
          <div className="bg-[var(--color-light)] rounded-2xl p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                <span className="font-medium text-[var(--color-primary)]">Recepcao</span>
                <span className="text-[var(--color-text-light)]">24 horas</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                <span className="font-medium text-[var(--color-primary)]">Check-in</span>
                <span className="text-[var(--color-text-light)]">A partir das {hotelInfo.checkInTime}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                <span className="font-medium text-[var(--color-primary)]">Check-out</span>
                <span className="text-[var(--color-text-light)]">Ate as {hotelInfo.checkOutTime}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                <span className="font-medium text-[var(--color-primary)]">Cafe da manha</span>
                <span className="text-[var(--color-text-light)]">06:30 as 10:00</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium text-[var(--color-primary)]">Room Service</span>
                <span className="text-[var(--color-text-light)]">06:00 as 23:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
