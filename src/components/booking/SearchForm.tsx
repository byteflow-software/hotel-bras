"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, addDays } from "date-fns";
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

interface SearchFormProps {
  onSearch?: (params: {
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
  }) => void;
  compact?: boolean;
}

export function SearchForm({ onSearch, compact = false }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkIn, setCheckIn] = useState(
    searchParams.get("checkIn") || format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || format(addDays(new Date(), 3), "yyyy-MM-dd")
  );
  const [adults, setAdults] = useState(searchParams.get("adults") || "2");
  const [children, setChildren] = useState(searchParams.get("children") || "0");

  const handleSearch = () => {
    const params = { checkIn, checkOut, adults, children };
    if (onSearch) {
      onSearch(params);
    } else {
      const urlParams = new URLSearchParams(params);
      router.push(`/reservas?${urlParams.toString()}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${compact ? "p-4" : "p-6 md:p-8"}`}
    >
      <div
        className={`grid gap-4 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
        } items-end`}
      >
        {/* Check-in */}
        <div className="space-y-2">
          <Label htmlFor="checkIn" className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
            Check-in
          </Label>
          <Input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
          />
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <Label htmlFor="checkOut" className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
            Check-out
          </Label>
          <Input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
          />
        </div>

        {/* Adults */}
        <div className="space-y-2">
          <Label htmlFor="adults" className="flex items-center gap-2 text-sm">
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
          <Label htmlFor="children" className="flex items-center gap-2 text-sm">
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
        <Button size="lg" onClick={handleSearch} className="w-full">
          <Search className="w-5 h-5 mr-2" />
          {compact ? "Buscar" : "Buscar Disponibilidade"}
        </Button>
      </div>
    </div>
  );
}
