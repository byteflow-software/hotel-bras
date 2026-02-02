import Link from "next/link";
import { Plane, Bus, Phone, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { TransferCarSvg } from "@/components/landing/TransferCarSvg";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/lib/mock";

export const metadata = {
  title: "Translado | Hotel Brás",
  description:
    "Serviço de translado exclusivo do Hotel Brás. Transporte do aeroporto de Guarulhos, Congonhas e Rodoviária Tietê com conforto e segurança.",
};

const destinations = [
  {
    icon: Plane,
    name: "Aeroporto de Guarulhos",
    code: "GRU",
    price: "R$ 120",
    description: "Aeroporto Internacional de São Paulo/Guarulhos",
  },
  {
    icon: Plane,
    name: "Aeroporto de Congonhas",
    code: "CGH",
    price: "R$ 120",
    description: "Aeroporto de São Paulo/Congonhas",
  },
  {
    icon: Bus,
    name: "Rodoviária Tietê",
    code: "TIE",
    price: "R$ 80",
    description: "Terminal Rodoviário Tietê",
  },
];

const steps = [
  {
    number: "1",
    title: "Entre em contato",
    description:
      "Solicite o translado pela recepção, telefone ou WhatsApp com antecedência.",
  },
  {
    number: "2",
    title: "Informe os detalhes",
    description:
      "Passe a data, horário do voo ou ônibus, e o número de passageiros.",
  },
  {
    number: "3",
    title: "Confirmação",
    description:
      "Receba a confirmação do agendamento com os dados do motorista.",
  },
  {
    number: "4",
    title: "Transporte seguro",
    description:
      "Nosso motorista estará no local combinado no horário marcado.",
  },
];

export default function TransladoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Serviço de Translado
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Transporte exclusivo do Hotel Brás com conforto e pontualidade para
            aeroportos e rodoviária.
          </p>
        </div>
      </section>

      {/* Intro + Car SVG */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-[var(--color-text-light)] text-lg leading-relaxed">
              O Hotel Brás oferece serviço de translado com veículo próprio para
              que você chegue ou parta com total conforto e segurança. Nosso
              motorista busca você no aeroporto ou rodoviária e leva diretamente
              ao hotel, sem preocupações.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-16">
            <TransferCarSvg />
            <p className="text-center text-sm text-[var(--color-neutral)] mt-3">
              Veículo exclusivo Hotel Brás
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {destinations.map((dest) => (
              <div
                key={dest.code}
                className="bg-white rounded-2xl border border-[var(--border)] p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[var(--color-secondary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <dest.icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-1">
                  {dest.name}
                </h3>
                <p className="text-sm text-[var(--color-neutral)] mb-4">
                  {dest.description}
                </p>
                <p className="text-3xl font-bold text-[var(--color-accent)]">
                  {dest.price}
                </p>
                <p className="text-sm text-[var(--color-neutral)] mt-1">
                  por trajeto
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Schedule */}
      <section className="py-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] text-center mb-12">
            Como Agendar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-light)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info + CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[var(--color-primary)] rounded-2xl p-8 md:p-12 text-white">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mb-6 text-center">
                Agende seu Translado
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                  <span className="text-white/90">
                    Veículo próprio do hotel, confortável e seguro
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                  <span className="text-white/90">
                    Motorista pontual no local combinado
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                  <span className="text-white/90">
                    Disponível para hóspedes e não-hóspedes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                  <span className="text-white/90">
                    Agende com antecedência pela recepção
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/90"
                >
                  <a
                    href={`https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de agendar o serviço de translado.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <a href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    {hotelInfo.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
