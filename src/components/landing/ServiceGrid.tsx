import {
  Wifi,
  Coffee,
  Car,
  Clock,
  Wind,
  Lock,
  Shirt,
  UtensilsCrossed,
} from "lucide-react";
import { services } from "@/lib/mock";

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-8 h-8" />,
  Coffee: <Coffee className="w-8 h-8" />,
  Car: <Car className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />,
  Lock: <Lock className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  UtensilsCrossed: <UtensilsCrossed className="w-8 h-8" />,
};

export function ServiceGrid() {
  return (
    <section className="py-20 bg-[var(--color-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            Nossos Servicos
          </h2>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">
            Oferecemos uma gama completa de servicos para tornar sua estadia ainda
            mais confortavel e agradavel.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-stagger">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-primary)] mb-4">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-semibold text-[var(--color-primary)] mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-[var(--color-text-light)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
