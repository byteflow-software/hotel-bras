import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/lib/mock";

export function CTASection() {
  return (
    <section className="py-20 bg-[var(--color-primary)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-secondary)] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary)] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
          Entre em Contato Conosco
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto animate-fade-in-delay">
          Fale diretamente com nossa equipe para consultar disponibilidade,
          tarifas e fazer sua reserva.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Button
            asChild
            size="xl"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            <Link href="/contato">
              <Mail className="w-5 h-5 mr-2" />
              Fale Conosco
            </Link>
          </Button>
          <Button
            asChild
            size="xl"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            <a href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}>
              <Phone className="w-5 h-5 mr-2" />
              Ligar
            </a>
          </Button>
        </div>

        <p className="mt-8 text-white/60 text-sm">
          Atendimento 24 horas | Localizacao privilegiada | Conforto garantido
        </p>
      </div>
    </section>
  );
}
