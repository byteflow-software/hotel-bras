import { Header, Footer } from "@/components/landing";
import { policies, hotelInfo } from "@/lib/mock";

export const metadata = {
  title: "Politicas e Termos | Hotel Bras",
  description: "Politicas de cancelamento, privacidade e termos de uso do Hotel Bras.",
};

export default function PoliticasPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Politicas e Termos
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Informacoes importantes sobre sua estadia no Hotel Bras.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="mb-12 p-4 bg-[var(--color-light)] rounded-xl">
            <ul className="flex flex-wrap gap-4 justify-center">
              <li>
                <a
                  href="#cancelamento"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Cancelamento
                </a>
              </li>
              <li className="text-[var(--color-neutral)]">|</li>
              <li>
                <a
                  href="#criancas"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Criancas
                </a>
              </li>
              <li className="text-[var(--color-neutral)]">|</li>
              <li>
                <a
                  href="#pets"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Pets
                </a>
              </li>
              <li className="text-[var(--color-neutral)]">|</li>
              <li>
                <a
                  href="#regras"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Regras
                </a>
              </li>
              <li className="text-[var(--color-neutral)]">|</li>
              <li>
                <a
                  href="#privacidade"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Privacidade
                </a>
              </li>
              <li className="text-[var(--color-neutral)]">|</li>
              <li>
                <a
                  href="#termos"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Termos
                </a>
              </li>
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-16">
            {/* Cancellation */}
            <section id="cancelamento" className="scroll-mt-32">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: policies.cancellation }}
              />
            </section>

            {/* Children */}
            <section id="criancas" className="scroll-mt-32">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: policies.children }}
              />
            </section>

            {/* Pets */}
            <section id="pets" className="scroll-mt-32">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: policies.pets }}
              />
            </section>

            {/* General Rules */}
            <section id="regras" className="scroll-mt-32">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: policies.general }}
              />
            </section>

            {/* Privacy Policy */}
            <section id="privacidade" className="scroll-mt-32">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-4">
                Politica de Privacidade (LGPD)
              </h3>
              <div className="prose prose-lg max-w-none text-[var(--color-text-light)]">
                <p>
                  O Hotel Bras esta comprometido com a protecao dos dados pessoais de seus
                  hospedes e visitantes, em conformidade com a Lei Geral de Protecao de
                  Dados (Lei n° 13.709/2018).
                </p>
                <h4>Dados Coletados</h4>
                <p>
                  Coletamos apenas os dados necessarios para a prestacao de nossos servicos:
                </p>
                <ul>
                  <li>Nome completo</li>
                  <li>E-mail</li>
                  <li>Telefone</li>
                  <li>Documento de identificacao (CPF ou passaporte)</li>
                  <li>Dados de pagamento (processados pelo gateway Asaas)</li>
                </ul>
                <h4>Finalidade</h4>
                <p>Seus dados sao utilizados exclusivamente para:</p>
                <ul>
                  <li>Processamento de reservas</li>
                  <li>Comunicacao sobre sua estadia</li>
                  <li>Cumprimento de obrigacoes legais</li>
                  <li>Envio de promocoes (apenas com seu consentimento)</li>
                </ul>
                <h4>Seus Direitos</h4>
                <p>
                  Voce tem direito a acessar, corrigir, excluir ou solicitar a
                  portabilidade de seus dados pessoais. Para exercer esses direitos,
                  entre em contato conosco pelo e-mail {hotelInfo.email}.
                </p>
              </div>
            </section>

            {/* Terms of Use */}
            <section id="termos" className="scroll-mt-32">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-4">
                Termos de Uso
              </h3>
              <div className="prose prose-lg max-w-none text-[var(--color-text-light)]">
                <p>
                  Ao utilizar nosso site e servicos de reserva, voce concorda com os
                  seguintes termos:
                </p>
                <h4>Reservas Online</h4>
                <ul>
                  <li>
                    As reservas estao sujeitas a disponibilidade e confirmacao de
                    pagamento.
                  </li>
                  <li>
                    Os precos exibidos incluem todas as taxas, exceto quando indicado.
                  </li>
                  <li>
                    O hospede deve apresentar documento de identificacao valido no
                    check-in.
                  </li>
                </ul>
                <h4>Responsabilidades</h4>
                <ul>
                  <li>
                    O hotel nao se responsabiliza por objetos de valor nao depositados
                    no cofre.
                  </li>
                  <li>
                    Danos causados as instalacoes serao cobrados conforme avaliacao.
                  </li>
                  <li>
                    O hotel reserva-se o direito de recusar hospedes que nao cumpram
                    as regras.
                  </li>
                </ul>
                <h4>Alteracoes</h4>
                <p>
                  Estes termos podem ser atualizados periodicamente. Recomendamos a
                  consulta regular desta pagina.
                </p>
                <p className="text-sm text-[var(--color-neutral)] mt-8">
                  Ultima atualizacao: Janeiro de 2026
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
