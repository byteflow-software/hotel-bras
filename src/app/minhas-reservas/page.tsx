"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Calendar, MapPin, User, Download } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { bookings } from "@/lib/mock";
import { formatCurrency, formatDateLong } from "@/lib/utils";
import { Booking } from "@/types";

export default function MinhasReservasPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Mock authentication - find bookings by email
    const found = bookings.filter(
      (b) =>
        b.customer.email.toLowerCase() === email.toLowerCase() ||
        b.code.toUpperCase() === code.toUpperCase()
    );

    if (found.length > 0) {
      setUserBookings(found);
      setAuthenticated(true);
    } else {
      setError(
        "Nenhuma reserva encontrada. Verifique o e-mail ou codigo informado."
      );
    }
  };

  const getStatusBadge = (booking: Booking) => {
    if (booking.status === "confirmed" && booking.paymentStatus === "paid") {
      return <Badge variant="success">Confirmada</Badge>;
    }
    if (booking.paymentStatus === "pending") {
      return <Badge variant="warning">Aguardando pagamento</Badge>;
    }
    if (booking.status === "cancelled") {
      return <Badge variant="destructive">Cancelada</Badge>;
    }
    return <Badge variant="secondary">{booking.status}</Badge>;
  };

  return (
    <main className="min-h-screen bg-[var(--color-lighter)]">
      <Header />

      <section className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] text-center mb-8">
            Minhas Reservas
          </h1>

          {!authenticated ? (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Acesse suas reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccess} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail usado na reserva</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-light)]" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-[var(--color-text-light)]">ou</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Codigo da reserva</Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="HB000000"
                      className="uppercase"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    Acessar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <p className="text-sm text-[var(--color-text-light)] text-center mt-6">
                  Dica: Use o e-mail{" "}
                  <span className="font-medium">maria.silva@email.com</span> para
                  ver uma reserva de exemplo.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-[var(--color-text-light)]">
                  Mostrando reservas para{" "}
                  <span className="font-medium text-[var(--color-text)]">
                    {email || code}
                  </span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthenticated(false);
                    setUserBookings([]);
                    setEmail("");
                    setCode("");
                  }}
                >
                  Sair
                </Button>
              </div>

              {userBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-[var(--color-text-light)]">
                      Nenhuma reserva encontrada.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {userBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Room Image */}
                          <div className="relative w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={booking.room.photos[0]}
                              alt={booking.room.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Booking Info */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)]">
                                    {booking.room.name}
                                  </h3>
                                  {getStatusBadge(booking)}
                                </div>
                                <p className="text-sm text-[var(--color-text-light)]">
                                  Codigo: {booking.code}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-[var(--color-accent)]">
                                  {formatCurrency(booking.priceQuote.total)}
                                </p>
                                <p className="text-xs text-[var(--color-text-light)]">
                                  {booking.paymentStatus === "paid"
                                    ? "Pago"
                                    : "Pendente"}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                                <div>
                                  <p className="text-[var(--color-text-light)]">
                                    Check-in
                                  </p>
                                  <p className="font-medium">
                                    {formatDateLong(booking.checkIn)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[var(--color-accent)]" />
                                <div>
                                  <p className="text-[var(--color-text-light)]">
                                    Check-out
                                  </p>
                                  <p className="font-medium">
                                    {formatDateLong(booking.checkOut)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[var(--color-accent)]" />
                                <div>
                                  <p className="text-[var(--color-text-light)]">
                                    Hospedes
                                  </p>
                                  <p className="font-medium">
                                    {booking.guests.adults} adultos
                                    {booking.guests.children > 0 &&
                                      `, ${booking.guests.children} criancas`}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Baixar comprovante
                              </Button>
                              {booking.paymentStatus === "pending" && (
                                <Button size="sm">Pagar agora</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/reservas">Fazer nova reserva</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
