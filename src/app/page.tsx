import type { Metadata } from "next";
import {
  Header,
  Footer,
  Hero,
  FeaturedRooms,
  ServiceGrid,
  LocationSection,
  CTASection,
} from "@/components/landing";
import { SeoContent } from "@/components/landing/SeoContent";
import { ChatWidget } from "@/components/chatbot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Hotel Brás | Hospedagem no Brás, São Paulo — WiFi e Café da Manhã" },
  description:
    "Hotel Brás em São Paulo: duas unidades no bairro do Brás (Rua Canindé), próximo ao metrô, com quartos equipados, WiFi grátis, café da manhã e recepção 24h. Reserve pelo (11) 3326-4952.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hotel Brás — Hospedagem no Brás, São Paulo",
    description:
      "Duas unidades no Brás, próximo ao metrô. WiFi grátis, café da manhã, recepção 24h. Reserve já.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedRooms />
      <ServiceGrid />
      <LocationSection />
      <SeoContent />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
