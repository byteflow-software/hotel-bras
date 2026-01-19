import {
  Header,
  Footer,
  HeroSearch,
  FeaturedRooms,
  ServiceGrid,
  LocationSection,
  CTASection,
} from "@/components/landing";
import { ChatWidget } from "@/components/chatbot";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSearch />
      <FeaturedRooms />
      <ServiceGrid />
      <LocationSection />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
