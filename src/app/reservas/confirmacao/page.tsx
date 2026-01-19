"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Mail,
  Download,
  MessageCircle,
  Phone,
  Copy,
} from "lucide-react";
import { Header, Footer } from "@/components/landing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { hotelInfo } from "@/lib/mock";
import { formatCurrency } from "@/lib/utils";

function ConfirmacaoContent() {
  const searchParams = useSearchParams();

  const bookingCode = searchParams.get("code") || "HB000000";
  const email = searchParams.get("email") || "";
  const total = parseFloat(searchParams.get("total") || "0");
  const paymentMethod = searchParams.get("paymentMethod") || "pix";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    alert("Codigo copiado!");
  };

  // Mock PIX data
  const pixCode =
    "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540" +
    total.toFixed(2).replace(".", "") +
    "5802BR5925HOTEL BRAS LTDA6009SAO PAULO62070503***6304";

  return (
    <main className="min-h-screen bg-[var(--color-lighter)]">
      <Header />

      <section className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Reserva Confirmada!
            </h1>
            <p className="text-[var(--color-text-light)] text-lg">
              Obrigado por escolher o Hotel Bras. Sua reserva foi realizada com
              sucesso.
            </p>
          </div>

          {/* Booking Code Card */}
          <Card className="mb-6">
            <CardContent className="py-8 text-center">
              <p className="text-[var(--color-text-light)] mb-2">
                Codigo da reserva
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-[var(--color-accent)] tracking-widest">
                  {bookingCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-[var(--color-light)] rounded-lg transition-colors"
                  aria-label="Copiar codigo"
                >
                  <Copy className="w-5 h-5 text-[var(--color-text-light)]" />
                </button>
              </div>
              <p className="text-sm text-[var(--color-text-light)] mt-4">
                Guarde este codigo. Voce precisara dele no check-in.
              </p>
            </CardContent>
          </Card>

          {/* Payment Info (PIX) */}
          {paymentMethod === "pix" && (
            <Card className="mb-6">
              <CardContent className="py-6">
                <h2 className="font-semibold text-[var(--color-primary)] mb-4 text-center">
                  Pagamento via Pix
                </h2>

                {/* QR Code placeholder */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-white border-2 border-[var(--border)] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-5 gap-1 p-4">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${
                              Math.random() > 0.5 ? "bg-black" : "bg-white"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[var(--color-text-light)] mt-2">
                        QR Code Pix
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-[var(--color-accent)]">
                    {formatCurrency(total)}
                  </p>
                </div>

                <div className="bg-[var(--color-light)] rounded-lg p-4">
                  <p className="text-sm text-[var(--color-text-light)] mb-2">
                    Pix Copia e Cola:
                  </p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={pixCode}
                      className="flex-1 text-xs bg-white border border-[var(--border)] rounded px-3 py-2 truncate"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(pixCode);
                        alert("Codigo Pix copiado!");
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-[var(--color-text-light)] text-center mt-4">
                  O pagamento deve ser realizado em ate 30 minutos para garantir
                  sua reserva.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Email Confirmation */}
          <Card className="mb-6">
            <CardContent className="py-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[var(--color-secondary-light)] rounded-lg">
                  <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-primary)] mb-1">
                    Confirmacao por e-mail
                  </h3>
                  <p className="text-sm text-[var(--color-text-light)]">
                    Enviamos os detalhes da sua reserva para{" "}
                    <span className="font-medium">{email}</span>. Verifique tambem
                    a pasta de spam.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/minhas-reservas">
                <Download className="w-4 h-4 mr-2" />
                Ver minhas reservas
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a
                href={`https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar pelo WhatsApp
              </a>
            </Button>
          </div>

          <Separator className="my-8" />

          {/* Hotel Info */}
          <div className="text-center">
            <h2 className="font-serif text-xl font-semibold text-[var(--color-primary)] mb-4">
              Informacoes do Hotel
            </h2>
            <div className="space-y-2 text-[var(--color-text-light)]">
              <p>
                {hotelInfo.address}, {hotelInfo.city} - {hotelInfo.state}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                {hotelInfo.phone}
              </p>
              <p>Check-in: {hotelInfo.checkInTime} | Check-out: {hotelInfo.checkOutTime}</p>
            </div>

            <Button asChild className="mt-8">
              <Link href="/">Voltar para o site</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ConfirmacaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ConfirmacaoContent />
    </Suspense>
  );
}
