"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, Maximize, Bed, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoomAvailability, RatePlan } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface RoomResultCardProps {
  result: RoomAvailability;
}

export function RoomResultCard({ result }: RoomResultCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(false);
  const [selectedRate, setSelectedRate] = useState<RatePlan | null>(null);

  const { room, rates, available } = result;

  const lowestRate = rates.reduce((min, rate) =>
    rate.pricePerNight < min.pricePerNight ? rate : min
  );

  const handleSelectRate = (rate: RatePlan) => {
    setSelectedRate(rate);
  };

  const handleReserve = () => {
    if (!selectedRate) return;

    const params = new URLSearchParams({
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      adults: searchParams.get("adults") || "2",
      children: searchParams.get("children") || "0",
      roomId: room.id,
      rateId: selectedRate.id,
    });

    router.push(`/reservas/checkout?${params.toString()}`);
  };

  if (!available) {
    return (
      <Card className="opacity-60">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={room.photos[0]}
                alt={room.name}
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="destructive" className="text-base">
                  Indisponivel
                </Badge>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-2">
                {room.name}
              </h3>
              <p className="text-[var(--color-text-light)] text-sm">
                {room.shortDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full lg:w-72 h-56 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={room.photos[0]}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-1">
                  {room.name}
                </h3>
                <p className="text-[var(--color-text-light)] text-sm mb-3">
                  {room.shortDescription}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[var(--color-text-light)]">A partir de</p>
                <p className="text-2xl font-bold text-[var(--color-accent)]">
                  {formatCurrency(lowestRate.pricePerNight)}
                </p>
                <p className="text-xs text-[var(--color-text-light)]">por noite</p>
              </div>
            </div>

            {/* Room Info */}
            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-light)] mb-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Ate {room.maxOccupancy}</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{room.size}m²</span>
              </div>
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{room.beds}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.slice(0, 5).map((amenity) => (
                <span
                  key={amenity}
                  className="px-2 py-1 bg-[var(--color-light)] text-[var(--color-text-light)] text-xs rounded"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 5 && (
                <span className="px-2 py-1 bg-[var(--color-light)] text-[var(--color-accent)] text-xs rounded">
                  +{room.amenities.length - 5}
                </span>
              )}
            </div>

            {/* Expand/Collapse Rates */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium hover:underline"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Ocultar tarifas
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Ver todas as tarifas ({rates.length})
                </>
              )}
            </button>
          </div>
        </div>

        {/* Rates Section */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <h4 className="font-semibold text-[var(--color-primary)] mb-4">
              Escolha sua tarifa
            </h4>
            <div className="space-y-3">
              {rates.map((rate) => (
                <div
                  key={rate.id}
                  onClick={() => handleSelectRate(rate)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRate?.id === rate.id
                      ? "border-[var(--color-accent)] bg-[var(--color-lighter)]"
                      : "border-[var(--border)] hover:border-[var(--color-secondary)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-[var(--color-primary)]">
                          {rate.name}
                        </h5>
                        {rate.breakfast && (
                          <Badge variant="secondary" className="text-xs">
                            Cafe incluso
                          </Badge>
                        )}
                        {rate.id === "non-refundable" && (
                          <Badge variant="outline" className="text-xs">
                            Melhor preco
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-light)] mt-1">
                        {rate.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {rate.policies.slice(0, 2).map((policy, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1 text-xs text-[var(--color-text-light)]"
                          >
                            <Check className="w-3 h-3 text-green-600" />
                            {policy}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--color-accent)]">
                        {formatCurrency(rate.pricePerNight)}
                      </p>
                      <p className="text-xs text-[var(--color-text-light)]">
                        por noite
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedRate && (
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleReserve}>
                  Continuar com {selectedRate.name}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
