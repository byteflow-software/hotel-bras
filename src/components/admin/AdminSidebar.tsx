"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bed,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/quartos", icon: Bed, label: "Quartos" },
  { href: "/admin/clientes", icon: Users, label: "Clientes" },
  { href: "/admin/configuracoes", icon: Settings, label: "Configuracoes" },
];

interface AdminSidebarProps {
  onLogout?: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-[var(--color-primary)] text-white rounded-lg lg:hidden"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-[var(--color-primary)] text-white transform transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/logo-hotel.jpeg"
                alt="Hotel Bras"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="font-serif text-lg font-bold text-[var(--color-secondary)]">
                  Hotel Bras
                </span>
                <p className="text-xs text-white/60">Painel Admin</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
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
