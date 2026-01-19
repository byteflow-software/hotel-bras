import Image from "next/image";
import { Calendar, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Room, RatePlan, PriceQuote, Guest } from "@/types";
import { formatCurrency, formatDateLong } from "@/lib/utils";

interface BookingSummaryProps {
  room: Room;
  rate: RatePlan;
  checkIn: Date;
  checkOut: Date;
  guests: Guest;
  priceQuote: PriceQuote;
  couponCode?: string;
}

export function BookingSummary({
  room,
  rate,
  checkIn,
  checkOut,
  guests,
  priceQuote,
}: BookingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumo da Reserva</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Room Info */}
        <div className="flex gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={room.photos[0]}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-serif font-semibold text-[var(--color-primary)]">
              {room.name}
            </h4>
            <p className="text-sm text-[var(--color-accent)]">{rate.name}</p>
            {rate.breakfast && (
              <p className="text-xs text-green-600 mt-1">
                Cafe da manha incluso
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Dates and Guests */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
            <div>
              <p className="text-[var(--color-text-light)]">Check-in</p>
              <p className="font-medium">{formatDateLong(checkIn)}</p>
              <p className="text-xs text-[var(--color-text-light)]">
                A partir das 14:00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
            <div>
              <p className="text-[var(--color-text-light)]">Check-out</p>
              <p className="font-medium">{formatDateLong(checkOut)}</p>
              <p className="text-xs text-[var(--color-text-light)]">
                Ate as 12:00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-[var(--color-accent)]" />
            <div>
              <p className="text-[var(--color-text-light)]">Hospedes</p>
              <p className="font-medium">
                {guests.adults} {guests.adults === 1 ? "adulto" : "adultos"}
                {guests.children > 0 &&
                  `, ${guests.children} ${guests.children === 1 ? "crianca" : "criancas"}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-[var(--color-accent)]" />
            <div>
              <p className="text-[var(--color-text-light)]">Duracao</p>
              <p className="font-medium">
                {priceQuote.nights} {priceQuote.nights === 1 ? "noite" : "noites"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-light)]">
              {formatCurrency(priceQuote.pricePerNight)} x {priceQuote.nights}{" "}
              {priceQuote.nights === 1 ? "noite" : "noites"}
            </span>
            <span>{formatCurrency(priceQuote.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-light)]">Taxas e impostos</span>
            <span>{formatCurrency(priceQuote.taxes)}</span>
          </div>
          {priceQuote.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Desconto {priceQuote.couponCode && `(${priceQuote.couponCode})`}</span>
              <span>-{formatCurrency(priceQuote.discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[var(--color-primary)]">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-[var(--color-accent)]">
              {formatCurrency(priceQuote.total)}
            </span>
            <p className="text-xs text-[var(--color-text-light)]">
              Pagamento na reserva
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
