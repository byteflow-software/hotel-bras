"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  CalendarDays,
  Users,
  Baby,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/lib/mock";

export function Hero() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);

  function handleChildrenChange(count: number) {
    setChildren(count);
    // Adjust ages array
    if (count > childrenAges.length) {
      setChildrenAges([
        ...childrenAges,
        ...Array(count - childrenAges.length).fill(0),
      ]);
    } else {
      setChildrenAges(childrenAges.slice(0, count));
    }
  }

  function handleChildAgeChange(index: number, age: number) {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  }

  function formatDate(dateStr: string) {
    if (!dateStr) return "a definir";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  function handleSearch() {
    const childrenInfo =
      children > 0
        ? `\n- Crianças: ${children} (idades: ${childrenAges.map((a) => `${a} anos`).join(", ")})`
        : "";

    const msg = `Olá! Gostaria de verificar disponibilidade:\n- Check-in: ${formatDate(checkIn)}\n- Check-out: ${formatDate(checkOut)}\n- Adultos: ${adults}${childrenInfo}`;
    const encoded = encodeURIComponent(msg);
    window.open(
      `https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}?text=${encoded}`,
      "_blank",
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image - Area Comum */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/rooms/area-comum-autonomo/IMG_8625.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-in-delay">
          Duas unidades no bairro do Canindé, em São Paulo. Conforto e
          praticidade para sua estadia perfeita.
        </p>

        {/* Date Selector */}
        <div className="max-w-4xl mx-auto bg-[#fbfbfb] backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl animate-slide-up overflow-hidden">
          {/* Row 1: Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--color-text-light)] uppercase tracking-wide flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Entrada
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full max-w-full box-border rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent appearance-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--color-text-light)] uppercase tracking-wide flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                Saída
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
                className="w-full max-w-full box-border rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent appearance-none"
              />
            </div>
          </div>

          {/* Row 2: Guests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--color-text-light)] uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Adultos
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "adulto" : "adultos"}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--color-text-light)] uppercase tracking-wide flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5" />
                Crianças
              </label>
              <select
                value={children}
                onChange={(e) => handleChildrenChange(Number(e.target.value))}
                className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "criança" : "crianças"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Consultar
              </Button>
            </div>
          </div>

          {/* Row 3: Children Ages (if any) */}
          {children > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <p className="text-xs font-medium text-[var(--color-text-light)] uppercase tracking-wide mb-3">
                Idade das crianças
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {childrenAges.map((age, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-text-light)]">
                      Criança {index + 1}:
                    </span>
                    <select
                      value={age}
                      onChange={(e) =>
                        handleChildAgeChange(index, Number(e.target.value))
                      }
                      className="rounded-lg border border-[var(--border)] bg-white px-2 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                    >
                      {Array.from({ length: 13 }, (_, i) => (
                        <option key={i} value={i}>
                          {i} {i === 1 ? "ano" : "anos"}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 text-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            <a
              href={`https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 text-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            <a href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}>
              <Phone className="w-5 h-5 mr-2" />
              {hotelInfo.phone}
            </a>
          </Button>
        </div>

        {/* Quick Info */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Duas unidades
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Bairro do Canindé
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Conforto e praticidade
          </div>
        </div>
      </div>
    </section>
  );
}
