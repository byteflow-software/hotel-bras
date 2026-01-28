"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hotelInfo } from "@/lib/mock";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/acomodacoes", label: "Acomodações" },
  { href: "/localizacao", label: "Localização" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-hotel.jpeg"
              alt="Hotel Brás"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="font-serif text-xl font-bold text-[var(--color-primary)] hidden sm:block">
              Hotel Brás
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">{hotelInfo.phone}</span>
            </a>
            <Button asChild size="lg">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--color-text)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4 pt-4 border-t border-[var(--border)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-[var(--color-text-light)]"
              >
                <Phone className="w-4 h-4" />
                <span>{hotelInfo.phone}</span>
              </a>
              <Button asChild size="lg" className="w-full">
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
