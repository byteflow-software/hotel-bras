"use client";

import { useState, useEffect } from "react";
import {
  Phone,
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
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

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
    window.location.href = "/contato";
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 animate-fade-in-delay">
          Duas unidades no bairro do Brás, em São Paulo. Conforto e
          praticidade para sua estadia perfeita.
        </p>

        {/* Booking Search Card */}
        <div className="max-w-3xl mx-auto animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-[var(--color-primary)] px-4 py-3 md:px-6 md:py-4">
              <h2 className="text-white text-sm md:text-base font-medium text-center">
                Consulte disponibilidade
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-4 md:p-6 space-y-4">
              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--color-lighter)] px-3 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || today}
                    className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--color-lighter)] px-3 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Guests Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Adultos
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--color-lighter)] px-3 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "adulto" : "adultos"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Crianças
                  </label>
                  <select
                    value={children}
                    onChange={(e) =>
                      handleChildrenChange(Number(e.target.value))
                    }
                    className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--color-lighter)] px-3 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "criança" : "crianças"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Children Ages (if any) */}
              {children > 0 && (
                <div className="pt-3 border-t border-[var(--border)]">
                  <p className="text-xs font-semibold text-[var(--color-text)] mb-3">
                    Idade das crianças
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {childrenAges.map((age, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 bg-[var(--color-lighter)] rounded-lg px-2 py-1.5"
                      >
                        <span className="text-xs text-[var(--color-text-light)]">
                          {index + 1}:
                        </span>
                        <select
                          value={age}
                          onChange={(e) =>
                            handleChildAgeChange(index, Number(e.target.value))
                          }
                          className="bg-transparent text-xs text-[var(--color-text)] focus:outline-none"
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

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Verificar Disponibilidade
              </Button>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
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
            Bairro do Brás
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
