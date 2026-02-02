import {
  Shirt,
  Scissors,
  Scale,
  Wind,
  Plug,
  Utensils,
  Thermometer,
  Lamp,
  AirVent,
  Flame,
  Zap,
  CookingPot,
  Coffee,
  Briefcase,
  Umbrella,
  Baby,
  Gamepad2,
  Dumbbell,
  Bike,
  Package,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shirt,
  Scissors,
  Scale,
  Wind,
  Plug,
  Utensils,
  Thermometer,
  Lamp,
  AirVent,
  Flame,
  Zap,
  CookingPot,
  Coffee,
  Briefcase,
  Umbrella,
  Baby,
  Gamepad2,
  Dumbbell,
  Bike,
  Package,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const IconComponent = iconMap[name] || Package;
  return <IconComponent className={className} />;
}
