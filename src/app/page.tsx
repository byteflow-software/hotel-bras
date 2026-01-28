import {
  Header,
  Footer,
  Hero,
  FeaturedRooms,
  ServiceGrid,
  LocationSection,
  CTASection,
} from "@/components/landing";
import { ChatWidget } from "@/components/chatbot";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedRooms />
      <ServiceGrid />
      <LocationSection />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
