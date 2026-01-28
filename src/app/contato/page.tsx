"use client";

import { useState, useTransition } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Loader2 } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelInfo, unitAddresses } from "@/lib/mock";
import { createContact } from "@/app/gerenciar/contatos/actions";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    });
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Entre em Contato
          </h1>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto text-lg">
            Estamos aqui para ajudar. Entre em contato conosco para duvidas,
            reservas ou qualquer informacao adicional.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--color-primary)] rounded-2xl p-8 text-white">
                <h2 className="font-serif text-2xl font-bold mb-8 text-[var(--color-secondary)]">
                  Informacoes de Contato
                </h2>

                <div className="space-y-6">
                  <a
                    href={`tel:+55${hotelInfo.phone.replace(/\D/g, "")}`}
                    className="flex items-start gap-4 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-white/80">{hotelInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-white/80">{hotelInfo.whatsapp}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${hotelInfo.email}`}
                    className="flex items-start gap-4 hover:text-[var(--color-secondary)] transition-colors"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-white/80">{hotelInfo.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{unitAddresses.autonoma.name}</p>
                      <p className="text-white/80">
                        {unitAddresses.autonoma.address}
                        <br />
                        {unitAddresses.autonoma.city} - {unitAddresses.autonoma.state}
                        <br />
                        CEP: {unitAddresses.autonoma.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{unitAddresses.flat.name}</p>
                      <p className="text-white/80">
                        {unitAddresses.flat.address}
                        <br />
                        {unitAddresses.flat.city} - {unitAddresses.flat.state}
                        <br />
                        CEP: {unitAddresses.flat.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Atendimento</p>
                      <p className="text-white/80">24 horas, 7 dias por semana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-green-800 mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-green-700">
                    Obrigado pelo contato. Responderemos em breve.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-6"
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="flex w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--color-text)] transition-colors placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:border-transparent resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
