import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { hotelInfo } from "@/lib/mock";

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo-hotel.jpeg"
                alt="Hotel Bras"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <span className="font-serif text-2xl font-bold text-[var(--color-secondary)]">
                Hotel Bras
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Conforto e elegancia no coracao do Bras. Sua hospedagem em Sao Paulo
              com localizacao privilegiada e atendimento de qualidade.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-accent)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-accent)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[var(--color-secondary)]">
              Links Rapidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/acomodacoes"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Acomodacoes
                </Link>
              </li>
              <li>
                <Link
                  href="/estrutura"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Estrutura
                </Link>
              </li>
              <li>
                <Link
                  href="/localizacao"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Localizacao
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[var(--color-secondary)]">
              Politicas
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/politicas#cancelamento"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Cancelamento
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas#privacidade"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas#termos"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas#regras"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Regras da Casa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[var(--color-secondary)]">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  {hotelInfo.address}
                  <br />
                  {hotelInfo.city} - {hotelInfo.state}
                  <br />
                  CEP: {hotelInfo.zipCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--color-secondary)]" />
                <a
                  href={`tel:${hotelInfo.phone.replace(/\D/g, "")}`}
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors text-sm"
                >
                  {hotelInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors text-sm"
                >
                  {hotelInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-white/80 text-sm">
                  Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Hotel Bras. Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-sm">
              Desenvolvido com carinho para sua melhor experiencia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
