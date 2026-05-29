import Link from "next/link";

export function SeoContent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
            Hotel no bairro do Brás, São Paulo
          </h2>
          <p className="text-[var(--color-text-light)] text-base md:text-lg leading-relaxed mb-4">
            O <strong>Hotel Brás</strong> está localizado na Rua Canindé, no
            coração do bairro do Brás, uma das regiões mais movimentadas e
            comerciais de São Paulo. Com duas unidades — a{" "}
            <Link href="/acomodacoes" className="text-[var(--color-accent)] underline hover:opacity-80">
              Unidade Autônoma
            </Link>{" "}
            (Rua Canindé, 469) e a Unidade Semi Automatizada (Rua Canindé, 445)
            — oferecemos opções de hospedagem para turistas, viajantes a
            trabalho, compradores do comércio do Brás e visitantes do bairro
            do Bom Retiro e 25 de Março.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-10 mb-4">
            Localização privilegiada
          </h3>
          <p className="text-[var(--color-text-light)] text-base md:text-lg leading-relaxed mb-4">
            Estamos a poucos minutos a pé da{" "}
            <strong>Estação Brás (Metrô e CPTM)</strong>, com acesso direto a
            todas as linhas que cortam a cidade. A região reúne o{" "}
            <strong>Brás Mall</strong>, a <strong>Rua Oriente</strong>, a{" "}
            <strong>25 de Março</strong> e o tradicional comércio popular —
            perfeito para quem vem fazer compras em São Paulo. Da nossa
            localização também é simples chegar à <strong>Rodoviária Tietê</strong>,
            ao <strong>Aeroporto de Congonhas (CGH)</strong> e ao{" "}
            <strong>Aeroporto de Guarulhos (GRU)</strong>. Veja todos os
            detalhes na nossa página de{" "}
            <Link href="/localizacao" className="text-[var(--color-accent)] underline hover:opacity-80">
              localização
            </Link>{" "}
            ou conheça nosso{" "}
            <Link href="/translado" className="text-[var(--color-accent)] underline hover:opacity-80">
              serviço de translado
            </Link>.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-10 mb-4">
            Estrutura e comodidades
          </h3>
          <p className="text-[var(--color-text-light)] text-base md:text-lg leading-relaxed mb-4">
            Todos os quartos contam com <strong>ar-condicionado</strong>,{" "}
            <strong>Wi-Fi gratuito de alta velocidade</strong>,{" "}
            <strong>TV</strong> e <strong>banheiro privativo</strong>. A
            recepção funciona <strong>24 horas</strong> e o{" "}
            <strong>café da manhã</strong> é servido das 06:30 às 10:00. Para
            sua comodidade, oferecemos itens para{" "}
            <Link href="/emprestimos" className="text-[var(--color-accent)] underline hover:opacity-80">
              empréstimo gratuito
            </Link>{" "}
            (ferro de passar, secador, e mais) — basta solicitar na recepção.
          </p>

          <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mt-10 mb-4">
            Para quem é o Hotel Brás?
          </h3>
          <ul className="text-[var(--color-text-light)] text-base md:text-lg leading-relaxed space-y-2 mb-4">
            <li>
              <strong>Compradores</strong> do comércio popular do Brás, Bom
              Retiro e 25 de Março
            </li>
            <li>
              <strong>Viajantes a trabalho</strong> que precisam de boa
              localização e acesso fácil ao transporte público
            </li>
            <li>
              <strong>Turistas</strong> que querem conhecer São Paulo a partir
              de uma região central, com tudo por perto
            </li>
            <li>
              <strong>Passageiros em conexão</strong> nos aeroportos de Guarulhos
              ou Congonhas
            </li>
          </ul>

          <p className="text-[var(--color-text-light)] text-base md:text-lg leading-relaxed mt-8">
            Quer saber mais ou fazer uma reserva?{" "}
            <Link href="/contato" className="text-[var(--color-accent)] underline hover:opacity-80 font-semibold">
              Fale conosco
            </Link>{" "}
            pelo telefone (11) 3326-4952 ou WhatsApp (11) 98453-8996.
          </p>
        </div>
      </div>
    </section>
  );
}
