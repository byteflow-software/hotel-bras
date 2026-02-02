"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bed,
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  HandHelping,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogo } from "@/contexts/LogoContext";

const menuItems = [
  { href: "/gerenciar", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/gerenciar/quartos", icon: Bed, label: "Quartos" },
  { href: "/gerenciar/areas-comuns", icon: Building2, label: "Áreas Comuns" },
  {
    href: "/gerenciar/itens-disponiveis",
    icon: HandHelping,
    label: "Itens Disponíveis",
  },
  { href: "/gerenciar/contatos", icon: MessageSquare, label: "Contatos" },
  { href: "/gerenciar/configuracoes", icon: Settings, label: "Configurações" },
];

interface AdminSidebarProps {
  onLogout?: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logo } = useLogo();

  const isActive = (href: string) => {
    if (href === "/gerenciar") return pathname === "/gerenciar";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--color-primary)] lg:hidden">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Hotel Brás"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div>
            <span className="font-serif text-base font-bold text-[var(--color-secondary)]">
              Hotel Brás
            </span>
            <p className="text-xs text-white/60">Painel Admin</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 z-40 w-64 bg-[var(--color-primary)] text-white transform transition-transform duration-300 lg:translate-x-0",
          "top-[60px] h-[calc(100%-60px)] lg:top-0 lg:h-full",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo - hidden on mobile since it's in the top bar */}
          <div className="hidden lg:block p-6 border-b border-white/10">
            <Link href="/gerenciar" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Hotel Brás"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="font-serif text-lg font-bold text-[var(--color-secondary)]">
                  Hotel Brás
                </span>
                <p className="text-xs text-white/60">Painel Admin</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 pt-2 lg:pt-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
