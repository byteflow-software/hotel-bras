"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeroSearch() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 3), "yyyy-MM-dd"));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
    });
    router.push(`/reservas?${params.toString()}`);
  };

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

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Check-in */}
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                Check-in
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={format(new Date(), "yyyy-MM-dd")}
                className="w-full"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <Label htmlFor="checkOut" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                Check-out
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="w-full"
              />
            </div>

            {/* Adults */}
            <div className="space-y-2">
              <Label htmlFor="adults" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-accent)]" />
                Adultos
              </Label>
              <Select value={adults} onValueChange={setAdults}>
                <SelectTrigger id="adults">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "adulto" : "adultos"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Children */}
            <div className="space-y-2">
              <Label htmlFor="children" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-accent)]" />
                Criancas
              </Label>
              <Select value={children} onValueChange={setChildren}>
                <SelectTrigger id="children">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "crianca" : "criancas"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button size="xl" onClick={handleSearch} className="w-full">
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Melhor preco garantido
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Cancelamento gratuito
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            Pagamento seguro
          </div>
        </div>
      </div>
    </section>
  );
}
