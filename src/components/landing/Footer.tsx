"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { hotelInfo, unitAddresses } from "@/lib/mock";
import { useLogo } from "@/contexts/LogoContext";

export function Footer() {
  const { logo } = useLogo();

  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src={logo}
                alt="Hotel Brás"
                width={60}
                height={60}
                className="rounded-lg"
                style={{ width: "auto", height: "auto" }}
              />
              <span className="font-serif text-2xl font-bold text-[var(--color-secondary)]">
                Hotel Brás
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Conforto e elegância no coração do Brás. Sua hospedagem em São
              Paulo com localização privilegiada e atendimento de qualidade.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/hotel_bras/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-accent)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/hotel.bras/"
                target="_blank"
                rel="noopener noreferrer"
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
                  href="/emprestimos"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Itens Disponiveis
                </Link>
              </li>
              <li>
                <Link
                  href="/translado"
                  className="text-white/80 hover:text-[var(--color-secondary)] transition-colors"
                >
                  Translado
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
                <div className="text-white/80 text-sm space-y-2">
                  <p>
                    <strong className="text-white/90">Autônoma:</strong>{" "}
                    {unitAddresses.autonoma.address}
                  </p>
                  <p>
                    <strong className="text-white/90">Flat:</strong>{" "}
                    {unitAddresses.flat.address}
                  </p>
                  <p>
                    {unitAddresses.autonoma.city} -{" "}
                    {unitAddresses.autonoma.state} | CEP:{" "}
                    {unitAddresses.autonoma.zipCode}
                  </p>
                </div>
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
                  Check-in: {hotelInfo.checkInTime} | Check-out:{" "}
                  {hotelInfo.checkOutTime}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Hotel Brás. Todos os direitos
              reservados.
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
