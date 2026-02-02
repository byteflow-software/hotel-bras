"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLogo } from "@/contexts/LogoContext";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/acomodacoes", label: "Acomodações" },
  { href: "/emprestimos", label: "Itens Disponíveis" },
  { href: "/translado", label: "Translado" },
  { href: "/localizacao", label: "Localização" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo } = useLogo();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="Hotel Brás"
              width={44}
              height={44}
              className="rounded-lg"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="font-serif text-xl font-bold text-[var(--color-secondary)]">
              Hotel Brás
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[var(--color-secondary)] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button asChild size="lg">
              <Link href="/contato">Fale Conosco</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
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
            mobileMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4 pt-4 border-t border-white/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/contato" onClick={() => setMobileMenuOpen(false)}>
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
