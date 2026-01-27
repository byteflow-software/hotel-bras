import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/lib/mock";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Bem-vindo ao{" "}
          <span className="text-[var(--color-secondary)]">Hotel Bras</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12">
          Descubra o conforto e a elegancia no coracao de Sao Paulo.
          Sua estadia perfeita comeca aqui.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="xl"
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
          >
            <a
              href={`https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Fale Conosco pelo WhatsApp
            </a>
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

        {/* Quick Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Localizacao privilegiada
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Atendimento 24 horas
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Conforto e qualidade
          </div>
        </div>
      </div>
    </section>
  );
}
