"use client";

import { useState } from "react";
import { MapPin, X } from "lucide-react";

interface MapPoint {
  id: string;
  name: string;
  address?: string;
  x: number;
  y: number;
  category: "hotel" | "shopping" | "feira" | "ponto" | "transporte";
}

const categories = {
  hotel: { color: "#3D2B1F", label: "Hotel Brás" },
  shopping: { color: "#DC2626", label: "Shoppings" },
  feira: { color: "#C026D3", label: "Feiras" },
  ponto: { color: "#2563EB", label: "Pontos de Interesse" },
  transporte: { color: "#16A34A", label: "Transporte" },
};

const mapPoints: MapPoint[] = [
  // Hotel
  { id: "hotel-autonoma", name: "Hotel Brás - Autônoma", address: "Rua Canindé, 469", x: 38, y: 48, category: "hotel" },
  { id: "hotel-flat", name: "Hotel Brás Flat", address: "Rua Canindé, 445", x: 36, y: 50, category: "hotel" },

  // Shoppings
  { id: "shopping-d", name: "Shopping D", address: "Av. Cruzeiro do Sul, 1100", x: 22, y: 30, category: "shopping" },
  { id: "shopping-vautier", name: "Shopping Vautier", address: "Rua Vautier, 123", x: 28, y: 38, category: "shopping" },
  { id: "shopping-new-bances", name: "Shopping New Bances", address: "Rua Hannemann", x: 52, y: 28, category: "shopping" },
  { id: "shopping-caninde", name: "Shopping Canindé", address: "Rua Canindé, 307", x: 40, y: 24, category: "shopping" },
  { id: "shopping-page-bras", name: "Shopping Page Brás", address: "Rua Hannemann, 415", x: 68, y: 18, category: "shopping" },
  { id: "shopping-porto", name: "Shopping Porto", address: "Rua Hannemann, 282", x: 58, y: 22, category: "shopping" },
  { id: "shopping-tuperan", name: "Shopping Tuperan", address: "R. João Teodoro, 270", x: 30, y: 45, category: "shopping" },
  { id: "shopping-900-950", name: "Shopping 900/950", address: "R. Oriente", x: 38, y: 60, category: "shopping" },
  { id: "shopping-122-123", name: "Shopping 122/123", address: "R. Oriente", x: 55, y: 58, category: "shopping" },
  { id: "gold-shop", name: "Gold Shop", address: "R. Oriente, 132", x: 48, y: 52, category: "shopping" },
  { id: "shopping-k", name: "Shopping K", address: "R. Bresser, 1331", x: 72, y: 32, category: "shopping" },
  { id: "shopping-25-marco", name: "Shopping 25 de Março", address: "R. 25 de Março, 402", x: 78, y: 72, category: "shopping" },
  { id: "atacado-barato", name: "Atacado Barato", address: "R. Oriente, 62", x: 35, y: 55, category: "shopping" },
  { id: "shopping-bolivar", name: "Shopping Bolívar", address: "R. Oriente", x: 25, y: 68, category: "shopping" },
  { id: "shopping-at", name: "Shopping AT", address: "R. João Teodoro, 67", x: 18, y: 42, category: "shopping" },
  { id: "shopping-azulao", name: "Shopping Azulão", address: "R. Alexandre Pedroso, 108", x: 25, y: 22, category: "shopping" },
  { id: "shopping-tiers", name: "Shopping Tiers", address: "Rua Hannemann, 335", x: 62, y: 15, category: "shopping" },
  { id: "shopping-hd", name: "Shopping HD", address: "R. Oriente, 83", x: 42, y: 56, category: "shopping" },

  // Feiras
  { id: "feira-madrugada", name: "Feira da Madrugada", address: "R. Oriente", x: 22, y: 58, category: "feira" },
  { id: "feirinha-concordia", name: "Feirinha da Concórdia", address: "R. da Concórdia, 873", x: 70, y: 82, category: "feira" },

  // Pontos de Interesse
  { id: "mercado-municipal", name: "Mercado Municipal", address: "R. da Cantareira, 306", x: 12, y: 85, category: "ponto" },
  { id: "museu-catavento", name: "Museu Catavento", address: "Av. Mercúrio", x: 10, y: 75, category: "ponto" },

  // Transporte
  { id: "estacao-armenia", name: "Estação Armênia", address: "Metrô Linha 1 - Azul", x: 8, y: 35, category: "transporte" },
  { id: "estacao-bras", name: "Estação Brás", address: "Metrô Linha 3 - Vermelha", x: 82, y: 88, category: "transporte" },
];

export function BrasMap() {
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div className="relative bg-[#FFF8E7] rounded-2xl overflow-hidden border-2 border-[var(--color-secondary)]">
        {/* Title */}
        <div className="bg-[var(--color-primary)] px-6 py-3 flex items-center justify-between">
          <div>
            <h3 className="text-[var(--color-secondary)] font-serif text-xl font-bold">
              BRAS
            </h3>
            <p className="text-white/70 text-xs">Mapa comercial da regiao</p>
          </div>
          <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
        </div>

        {/* SVG Map */}
        <svg
          viewBox="0 0 100 100"
          className="w-full"
          style={{ aspectRatio: "1 / 1" }}
        >
          {/* Background */}
          <rect width="100" height="100" fill="#FFF8E7" />

          {/* Territory highlight */}
          <rect x="15" y="15" width="70" height="75" rx="2" fill="#FFFDE7" stroke="#C9A86C" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />

          {/* Major Roads */}
          {/* Av. Cruzeiro do Sul - vertical left */}
          <line x1="15" y1="5" x2="15" y2="95" stroke="#E5A53D" strokeWidth="1.2" />
          <text x="10" y="50" fill="#8B7355" fontSize="1.8" transform="rotate(-90, 10, 50)" textAnchor="middle" fontWeight="600">Av. Cruzeiro do Sul</text>

          {/* Rua Caninde - horizontal */}
          <line x1="10" y1="48" x2="90" y2="48" stroke="#E5A53D" strokeWidth="0.8" />
          <text x="65" y="46.5" fill="#8B7355" fontSize="1.6" fontWeight="600">Rua Canindé</text>

          {/* Rua Hannemann - horizontal top */}
          <line x1="20" y1="20" x2="85" y2="20" stroke="#E5A53D" strokeWidth="0.6" />
          <text x="50" y="18.5" fill="#8B7355" fontSize="1.4" textAnchor="middle">Rua Hannemann</text>

          {/* Rua Oriente - horizontal */}
          <line x1="10" y1="58" x2="90" y2="58" stroke="#E5A53D" strokeWidth="0.8" />
          <text x="80" y="56.5" fill="#8B7355" fontSize="1.6" fontWeight="600">Rua Oriente</text>

          {/* Rua Joao Teodoro - horizontal */}
          <line x1="10" y1="40" x2="85" y2="40" stroke="#E5A53D" strokeWidth="0.6" />
          <text x="60" y="38.5" fill="#8B7355" fontSize="1.4">Rua João Teodoro</text>

          {/* Rua Alexandre Pedroso - horizontal */}
          <line x1="15" y1="28" x2="75" y2="28" stroke="#E5A53D" strokeWidth="0.5" />
          <text x="45" y="26.5" fill="#8B7355" fontSize="1.2">Rua Alexandre Pedroso</text>

          {/* Rua Bresser - vertical right */}
          <line x1="75" y1="10" x2="75" y2="90" stroke="#E5A53D" strokeWidth="0.8" />
          <text x="80" y="50" fill="#8B7355" fontSize="1.6" transform="rotate(-90, 80, 50)" textAnchor="middle" fontWeight="600">Rua Bresser</text>

          {/* Rua Henrique Dias - horizontal */}
          <line x1="30" y1="52" x2="85" y2="52" stroke="#E5A53D" strokeWidth="0.4" />
          <text x="60" y="51" fill="#8B7355" fontSize="1.1">R. Henrique Dias</text>

          {/* R. da Concordia */}
          <line x1="40" y1="80" x2="90" y2="80" stroke="#E5A53D" strokeWidth="0.5" />
          <text x="55" y="78.5" fill="#8B7355" fontSize="1.2">R. da Concórdia</text>

          {/* Vertical streets */}
          <line x1="35" y1="15" x2="35" y2="90" stroke="#E5A53D" strokeWidth="0.4" />
          <line x1="50" y1="15" x2="50" y2="90" stroke="#E5A53D" strokeWidth="0.4" />
          <line x1="62" y1="15" x2="62" y2="90" stroke="#E5A53D" strokeWidth="0.4" />

          {/* Feira da Madrugada area highlight */}
          <rect x="18" y="55" width="12" height="8" rx="1" fill="#C026D3" opacity="0.15" stroke="#C026D3" strokeWidth="0.3" />

          {/* Map Points */}
          {mapPoints.map((point) => {
            const cat = categories[point.category];
            const isHotel = point.category === "hotel";
            const isHovered = hoveredId === point.id;
            const isSelected = selected?.id === point.id;
            const r = isHotel ? 2.2 : 1.5;

            return (
              <g
                key={point.id}
                onClick={() => setSelected(point)}
                onMouseEnter={() => setHoveredId(point.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                {/* Glow effect */}
                {(isHovered || isSelected) && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={r + 1.5}
                    fill={cat.color}
                    opacity="0.2"
                  />
                )}
                {/* Pin */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={r}
                  fill={cat.color}
                  stroke="white"
                  strokeWidth="0.5"
                />
                {/* Hotel special marker */}
                {isHotel && (
                  <text
                    x={point.x}
                    y={point.y + 0.7}
                    fill="white"
                    fontSize="2"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    H
                  </text>
                )}
                {/* Label */}
                {(isHovered || isSelected || isHotel) && (
                  <text
                    x={point.x}
                    y={point.y - r - 1}
                    fill={cat.color}
                    fontSize={isHotel ? "2" : "1.6"}
                    textAnchor="middle"
                    fontWeight={isHotel ? "bold" : "600"}
                    className="pointer-events-none"
                  >
                    {point.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="px-6 py-4 bg-white/80 border-t border-[var(--color-secondary)]">
          <p className="text-xs font-semibold text-[var(--color-primary)] mb-2 uppercase tracking-wider">
            Legendas
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(categories).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ backgroundColor: val.color }}
                />
                <span className="text-xs text-[var(--color-text-light)]">
                  {val.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Point Popup */}
      {selected && (
        <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-[200px] z-10 border border-[var(--border)]">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-[var(--color-text-light)] hover:text-[var(--color-text)]"
          >
            <X className="w-4 h-4" />
          </button>
          <div
            className="w-3 h-3 rounded-sm mb-2"
            style={{ backgroundColor: categories[selected.category].color }}
          />
          <h4 className="font-semibold text-[var(--color-primary)] text-sm">
            {selected.name}
          </h4>
          {selected.address && (
            <p className="text-xs text-[var(--color-text-light)] mt-1">
              {selected.address}
            </p>
          )}
          <p className="text-xs text-[var(--color-accent)] mt-1">
            {categories[selected.category].label}
          </p>
        </div>
      )}
    </div>
  );
}
