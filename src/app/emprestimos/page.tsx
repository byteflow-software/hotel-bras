import { Header, Footer } from "@/components/landing";
import { Clock, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Itens Disponíveis | Hotel Brás",
  description:
    "Confira os itens disponíveis para empréstimo aos hóspedes do Hotel Brás. Ferro de passar, prancha de cabelo, balança e mais.",
};

const loanItems = [
  {
    name: "Ferro de Passar",
    description: "Ferro a vapor para suas roupas",
    icon: "🔥",
  },
  {
    name: "Prancha de Cabelo",
    description: "Prancha alisadora profissional",
    icon: "💇",
  },
  {
    name: "Balança",
    description: "Balança de bagagem para pesar suas malas",
    icon: "⚖️",
  },
  {
    name: "Tesoura",
    description: "Tesoura para uso geral",
    icon: "✂️",
  },
  {
    name: "Secador de Cabelo",
    description: "Secador de cabelo com duas velocidades",
    icon: "💨",
  },
  {
    name: "Tábua de Passar",
    description: "Tábua de passar dobrável",
    icon: "🧺",
  },
];

export default function EmprestimosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Itens Disponíveis
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Para maior conforto dos nossos hóspedes, disponibilizamos diversos
            itens para empréstimo por tempo determinado.
          </p>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notice */}
          <div className="flex items-start gap-4 bg-[var(--color-secondary-light)] rounded-2xl p-6 mb-12">
            <AlertCircle className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                Como funciona?
              </h3>
              <p className="text-[var(--color-text-light)] text-sm">
                Os itens abaixo estão disponíveis para empréstimo mediante
                solicitação na recepção. O uso é por tempo determinado e sujeito
                à disponibilidade. Após o uso, pedimos que devolva o item à
                recepção.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanItems.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[var(--border)]"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-[var(--color-primary)] text-lg mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-[var(--color-text-light)]">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-accent)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Empréstimo por tempo determinado</span>
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
