"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { SearchForm, RoomResultCard } from "@/components/booking";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomAvailability } from "@/types";
import { searchAvailability } from "@/lib/mock";
import { calculateNights } from "@/lib/utils";

function ReservasContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<RoomAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("price-asc");
  const [filterCapacity, setFilterCapacity] = useState("all");

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults") || "2";
  const children = searchParams.get("children") || "0";

  useEffect(() => {
    if (checkIn && checkOut) {
      handleSearch({
        checkIn,
        checkOut,
        adults,
        children,
      });
    }
  }, [checkIn, checkOut, adults, children]);

  const handleSearch = async (params: {
    checkIn: string;
    checkOut: string;
    adults: string;
    children: string;
  }) => {
    setLoading(true);
    setSearched(true);

    try {
      const data = await searchAvailability({
        checkIn: new Date(params.checkIn),
        checkOut: new Date(params.checkOut),
        guests: {
          adults: parseInt(params.adults),
          children: parseInt(params.children),
        },
      });
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting
  let filteredResults = [...results];

  if (filterCapacity !== "all") {
    const capacity = parseInt(filterCapacity);
    filteredResults = filteredResults.filter(
      (r) => r.room.maxOccupancy >= capacity
    );
  }

  filteredResults.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        const aMinPrice = Math.min(...a.rates.map((r) => r.pricePerNight));
        const bMinPrice = Math.min(...b.rates.map((r) => r.pricePerNight));
        return aMinPrice - bMinPrice;
      case "price-desc":
        const aMaxPrice = Math.max(...a.rates.map((r) => r.pricePerNight));
        const bMaxPrice = Math.max(...b.rates.map((r) => r.pricePerNight));
        return bMaxPrice - aMaxPrice;
      case "capacity":
        return b.room.maxOccupancy - a.room.maxOccupancy;
      default:
        return 0;
    }
  });

  const availableCount = filteredResults.filter((r) => r.available).length;

  return (
    <main className="min-h-screen bg-[var(--color-lighter)]">
      <Header />

      {/* Search Section */}
      <section className="pt-28 pb-8 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o site
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white mb-6">
            Encontre seu quarto ideal
          </h1>
          <SearchForm onSearch={handleSearch} compact />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!searched ? (
            <div className="text-center py-16">
              <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-4">
                Busque sua hospedagem
              </h2>
              <p className="text-[var(--color-text-light)]">
                Selecione as datas e numero de hospedes para ver a disponibilidade.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-accent)] border-t-transparent mx-auto mb-4" />
              <p className="text-[var(--color-text-light)]">
                Buscando disponibilidade...
              </p>
            </div>
          ) : (
            <>
              {/* Filters Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-[var(--color-text)]">
                    <span className="font-semibold">{availableCount}</span>{" "}
                    {availableCount === 1 ? "quarto disponivel" : "quartos disponiveis"}
                    {checkIn && checkOut && (
                      <span className="text-[var(--color-text-light)]">
                        {" "}
                        para {calculateNights(new Date(checkIn), new Date(checkOut))}{" "}
                        noites
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Select value={filterCapacity} onValueChange={setFilterCapacity}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Capacidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="2">2+ pessoas</SelectItem>
                      <SelectItem value="3">3+ pessoas</SelectItem>
                      <SelectItem value="4">4+ pessoas</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Menor preco</SelectItem>
                      <SelectItem value="price-desc">Maior preco</SelectItem>
                      <SelectItem value="capacity">Maior capacidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results List */}
              {filteredResults.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl">
                  <h3 className="font-serif text-xl text-[var(--color-primary)] mb-2">
                    Nenhum quarto encontrado
                  </h3>
                  <p className="text-[var(--color-text-light)] mb-6">
                    Tente ajustar os filtros ou alterar as datas da busca.
                  </p>
                  <Button onClick={() => setFilterCapacity("all")}>
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredResults.map((result) => (
                    <RoomResultCard key={result.roomId} result={result} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ReservasPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ReservasContent />
    </Suspense>
  );
}
