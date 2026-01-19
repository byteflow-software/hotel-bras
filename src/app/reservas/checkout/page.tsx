"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, QrCode, Tag, Check, AlertCircle } from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { BookingSummary, HoldTimer } from "@/components/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rooms, ratePlans, calculatePriceQuote, validatePromoCode } from "@/lib/mock";
import { PriceQuote, Room, RatePlan } from "@/types";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("roomId");
  const rateId = searchParams.get("rateId");
  const checkInStr = searchParams.get("checkIn");
  const checkOutStr = searchParams.get("checkOut");
  const adultsStr = searchParams.get("adults") || "2";
  const childrenStr = searchParams.get("children") || "0";

  const [room, setRoom] = useState<Room | null>(null);
  const [rate, setRate] = useState<RatePlan | null>(null);
  const [priceQuote, setPriceQuote] = useState<PriceQuote | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<Date>(
    new Date(Date.now() + 10 * 60 * 1000)
  );
  const [expired, setExpired] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    notes: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkIn = checkInStr ? new Date(checkInStr) : new Date();
  const checkOut = checkOutStr ? new Date(checkOutStr) : new Date();
  const guests = {
    adults: parseInt(adultsStr),
    children: parseInt(childrenStr),
  };

  useEffect(() => {
    if (roomId && rateId) {
      const foundRoom = rooms.find((r) => r.id === roomId);
      const foundRate = ratePlans.find((r) => r.id === rateId);

      if (foundRoom && foundRate) {
        setRoom(foundRoom);
        setRate(foundRate);
        const quote = calculatePriceQuote(
          roomId,
          rateId,
          checkIn,
          checkOut,
          guests
        );
        setPriceQuote(quote);
      }
    }
  }, [roomId, rateId]);

  const handleApplyCoupon = () => {
    setCouponError("");
    const promo = validatePromoCode(couponCode);

    if (promo) {
      const quote = calculatePriceQuote(
        roomId!,
        rateId!,
        checkIn,
        checkOut,
        guests,
        couponCode
      );
      setPriceQuote(quote);
      setCouponApplied(true);
    } else {
      setCouponError("Cupom invalido ou expirado");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Por favor, aceite os termos e condicoes para continuar.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate a mock booking code
    const bookingCode = `HB${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Redirect to confirmation
    const params = new URLSearchParams({
      code: bookingCode,
      email: formData.email,
      total: priceQuote?.total.toString() || "0",
      paymentMethod,
    });

    router.push(`/reservas/confirmacao?${params.toString()}`);
  };

  const handleExpire = () => {
    setExpired(true);
  };

  if (!room || !rate || !priceQuote) {
    return (
      <main className="min-h-screen bg-[var(--color-lighter)]">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-2xl text-[var(--color-primary)] mb-4">
            Reserva nao encontrada
          </h1>
          <p className="text-[var(--color-text-light)] mb-6">
            Por favor, inicie uma nova busca.
          </p>
          <Button asChild>
            <Link href="/reservas">Voltar para busca</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-lighter)]">
      <Header />

      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/reservas"
            className="inline-flex items-center gap-2 text-[var(--color-text-light)] hover:text-[var(--color-accent)] mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para resultados
          </Link>

          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-8">
            Finalize sua reserva
          </h1>

          {/* Hold Timer */}
          <div className="mb-8">
            <HoldTimer expiresAt={holdExpiresAt} onExpire={handleExpire} />
          </div>

          {expired ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-2">
                  Sua reserva expirou
                </h2>
                <p className="text-[var(--color-text-light)] mb-6">
                  O tempo para finalizar sua reserva esgotou. Por favor, inicie uma
                  nova busca.
                </p>
                <Button asChild>
                  <Link href="/reservas">Nova busca</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit}>
                  {/* Guest Info */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Dados do Hospede</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="document">CPF ou Passaporte</Label>
                          <Input
                            id="document"
                            value={formData.document}
                            onChange={(e) =>
                              setFormData({ ...formData, document: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Observacoes (opcional)</Label>
                        <textarea
                          id="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({ ...formData, notes: e.target.value })
                          }
                          placeholder="Solicitacoes especiais, horario de chegada, etc."
                          className="flex w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--color-text)] transition-colors placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-transparent resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coupon */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Cupom de Desconto
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Digite seu cupom"
                          disabled={couponApplied}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={couponApplied || !couponCode}
                        >
                          {couponApplied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Aplicado
                            </>
                          ) : (
                            "Aplicar"
                          )}
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-red-600 text-sm mt-2">{couponError}</p>
                      )}
                      {couponApplied && (
                        <p className="text-green-600 text-sm mt-2">
                          Cupom aplicado com sucesso!
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Forma de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="pix" className="flex items-center gap-2">
                            <QrCode className="w-4 h-4" />
                            Pix
                          </TabsTrigger>
                          <TabsTrigger
                            value="credit_card"
                            className="flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            Cartao
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="pix" className="mt-4">
                          <div className="p-4 bg-[var(--color-light)] rounded-lg">
                            <p className="text-sm text-[var(--color-text-light)]">
                              Apos confirmar, voce recebera um QR Code Pix para
                              pagamento. O pagamento deve ser realizado em ate 30
                              minutos.
                            </p>
                          </div>
                        </TabsContent>
                        <TabsContent value="credit_card" className="mt-4">
                          <div className="p-4 bg-[var(--color-light)] rounded-lg">
                            <p className="text-sm text-[var(--color-text-light)]">
                              Voce sera redirecionado para o ambiente seguro de
                              pagamento para informar os dados do cartao.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Terms */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={acceptTerms}
                          onCheckedChange={(checked) =>
                            setAcceptTerms(checked as boolean)
                          }
                        />
                        <label htmlFor="terms" className="text-sm leading-relaxed">
                          Li e aceito a{" "}
                          <Link
                            href="/politicas#cancelamento"
                            className="text-[var(--color-accent)] hover:underline"
                            target="_blank"
                          >
                            politica de cancelamento
                          </Link>
                          , os{" "}
                          <Link
                            href="/politicas#termos"
                            className="text-[var(--color-accent)] hover:underline"
                            target="_blank"
                          >
                            termos de uso
                          </Link>{" "}
                          e a{" "}
                          <Link
                            href="/politicas#privacidade"
                            className="text-[var(--color-accent)] hover:underline"
                            target="_blank"
                          >
                            politica de privacidade
                          </Link>
                          .
                        </label>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    size="xl"
                    className="w-full"
                    disabled={loading || !acceptTerms}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Processando...
                      </>
                    ) : (
                      "Confirmar e Pagar"
                    )}
                  </Button>
                </form>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <BookingSummary
                    room={room}
                    rate={rate}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    guests={guests}
                    priceQuote={priceQuote}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
