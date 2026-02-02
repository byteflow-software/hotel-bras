import { Header, Footer } from "@/components/landing";
import { Clock, AlertCircle } from "lucide-react";
import { getActiveLoanItems } from "@/app/gerenciar/itens-disponiveis/actions";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export const metadata = {
  title: "Itens Disponíveis | Hotel Brás",
  description:
    "Confira os itens disponíveis para empréstimo aos hóspedes do Hotel Brás. Ferro de passar, prancha de cabelo, balança e mais.",
};

export const dynamic = "force-dynamic";

export default async function EmprestimosPage() {
  const loanItems = await getActiveLoanItems();

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

          {loanItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--color-text-light)]">
                Nenhum item disponível no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[var(--border)]"
                >
                  <div className="w-12 h-12 bg-[var(--color-secondary-light)] rounded-xl flex items-center justify-center mb-4">
                    <DynamicIcon
                      name={item.icon}
                      className="w-6 h-6 text-[var(--color-primary)]"
                    />
                  </div>
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
