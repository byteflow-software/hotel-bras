"use client";

import { useEffect, useRef, useState } from "react";

interface GMapPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: "hotel" | "shopping" | "feira" | "ponto" | "transporte";
  link?: string;
}

const categoryConfig: Record<
  GMapPoint["category"],
  { color: string; label: string; glyph: string }
> = {
  hotel: { color: "#3D2B1F", label: "Hotel Brás", glyph: "H" },
  shopping: { color: "#DC2626", label: "Shopping", glyph: "S" },
  feira: { color: "#C026D3", label: "Feira", glyph: "F" },
  ponto: { color: "#2563EB", label: "Ponto de Interesse", glyph: "P" },
  transporte: { color: "#16A34A", label: "Transporte", glyph: "T" },
};

const gMapPoints: GMapPoint[] = [
  // Hotel
  { id: "hotel-autonoma", name: "Hotel Brás - Unidade Autônoma", address: "Rua Canindé, 469 - Brás", lat: -23.53034373754878, lng: -46.623192753650684, category: "hotel" },
  { id: "hotel-flat", name: "Hotel Brás - Unidade Flat", address: "Rua Canindé, 445 - Brás", lat: -23.530530051858115, lng: -46.623254482505395, category: "hotel" },

  // Shoppings e Galerias
  { id: "shop-elev", name: "Shop Elev Brás", address: "Nº 558", lat: -23.530415001593187, lng: -46.61978390243767, category: "shopping", link: "https://maps.app.goo.gl/7LkKHMaW13DayJnc6" },
  { id: "shopping-tiers", name: "Shopping Tiers", address: "Nº 335", lat: -23.531024187023462, lng: -46.619898585243305, category: "shopping", link: "https://maps.app.goo.gl/dTyWCbehE6v6c9uu5" },
  { id: "galeria-page", name: "Galeria Pagé Brás", address: "Nº 415", lat: -23.53177594670968, lng: -46.61931826010938, category: "shopping", link: "https://maps.app.goo.gl/JkXYkK7Zw9XJcHns7" },
  { id: "shopping-azulao", name: "Shopping Azulão", address: "Nº 158", lat: -23.532292493725762, lng: -46.62186361778097, category: "shopping", link: "https://maps.app.goo.gl/sN4rnhfhWaUjCbGd7" },
  { id: "shopping-caninde", name: "Shopping Canindé", address: "Nº 307", lat: -23.53208561941217, lng: -46.620821415289186, category: "shopping", link: "https://maps.app.goo.gl/rKTA6fJzK9VXXh859" },
  { id: "shopping-porto", name: "Shopping Porto", address: "Nº 282", lat: -23.53290489445791, lng: -46.61959281963189, category: "shopping", link: "https://maps.app.goo.gl/rtMnvdMg9cKqnKsD6" },
  { id: "shopping-carnot", name: "Shopping Carnot", address: "Nº 215", lat: -23.532293374365526, lng: -46.62280499079617, category: "shopping", link: "https://maps.app.goo.gl/hoa5xZJmx5ELap5h9" },
  { id: "shopping-vautier", name: "Shopping Vautier", address: "Nº 173", lat: -23.533100948689953, lng: -46.62167883312447, category: "shopping", link: "https://maps.app.goo.gl/inEjpSYMrfwEtNdY9" },
  { id: "shopping-new-bancas", name: "Shopping New Bancas", address: "Nº 416", lat: -23.533248172421576, lng: -46.61983792788349, category: "shopping", link: "https://maps.app.goo.gl/6N4wsPiTAQie7Vh28" },
  { id: "shopping-vautier-premium", name: "Shopping Vautier Premium", address: "Nº 184", lat: -23.533800275492226, lng: -46.620677735859665, category: "shopping", link: "https://maps.app.goo.gl/jiyugpeSTpe3aNui8" },
  { id: "galeria-bemtevi", name: "Galeria Bem-te-vi", address: "Nº 85", lat: -23.53409805018032, lng: -46.62227777545272, category: "shopping", link: "https://maps.app.goo.gl/fdZRAbuSKJWznBbA9" },
  { id: "shopping-a1", name: "Shopping A1", address: "Nº 67", lat: -23.534251250409362, lng: -46.622529748467755, category: "shopping", link: "https://maps.app.goo.gl/4gS8jy6CScAcxM3n9" },
  { id: "shopping-tupan", name: "Shopping Tupan", address: "Nº 276", lat: -23.533304848994746, lng: -46.62162767545263, category: "shopping", link: "https://maps.app.goo.gl/LxZm1A89sZbzs7DJ7" },
  { id: "shopping-brasmix", name: "Shopping Brasmix", address: "Nº 1117", lat: -23.534772360313998, lng: -46.62172848894515, category: "shopping", link: "https://maps.app.goo.gl/fRVN9Rjk83iYMmkk7" },
  { id: "shopping-vht", name: "Shopping VHT", address: "Nº 94", lat: -23.53488305135379, lng: -46.62077490428839, category: "shopping", link: "https://maps.app.goo.gl/8vapvStui4Yr2cu97" },
  { id: "shopping-k", name: "Shopping K", address: "Nº 1331", lat: -23.538063409022232, lng: -46.62037551778088, category: "shopping", link: "https://maps.app.goo.gl/ZtHkfL2t8VLPySS28" },
  { id: "shopping-newmall", name: "Shopping Newmall", address: "Nº 1122", lat: -23.535523570730557, lng: -46.621696175452506, category: "shopping", link: "https://maps.app.goo.gl/NUC9EM99Jz6vKdTH7" },
  { id: "atacado-barato", name: "Atacado Barato", address: "Nº 62", lat: -23.535933498079046, lng: -46.62179421963189, category: "shopping", link: "https://maps.app.goo.gl/kU2U5WhYoxgQAfGJ9" },
  { id: "gold-shop", name: "Gold Shop", address: "Nº 130/132", lat: -23.536023198186324, lng: -46.6210346619601, category: "shopping", link: "https://maps.app.goo.gl/GNo8M4NqJ3iXDYYX7" },
  { id: "hm-plaza", name: "HM Plaza Shopping", address: "Nº 170", lat: -23.535917207751375, lng: -46.62065117545258, category: "shopping", link: "https://maps.app.goo.gl/Eokb8JFxhrVmw1EQ8" },
  { id: "shopping-hd", name: "Shopping HD", address: "Nº 83", lat: -23.53643909868362, lng: -46.62126204661677, category: "shopping", link: "https://maps.app.goo.gl/xMkTyJ3V9uajNSqr7" },
  { id: "galeria-cristal", name: "Galeria Cristal", address: "Nº 957", lat: -23.536689845365633, lng: -46.62230218894519, category: "shopping", link: "https://maps.app.goo.gl/ga6rBR7G6iKwiE2Y6" },
  { id: "shopping-950", name: "Shopping 950", address: "Nº 950", lat: -23.536981635544624, lng: -46.62204438894503, category: "shopping", link: "https://maps.app.goo.gl/FwPueTe3HyYzNJN57" },
  { id: "shopping-900", name: "Shopping 900", address: "Nº 900", lat: -23.5372662825424, lng: -46.62205477545248, category: "shopping", link: "https://maps.app.goo.gl/DUaBZ3SjUsnhPbJVA" },
  { id: "shopping-bolivia", name: "Shopping Bolivia", address: "Nº 889", lat: -23.53775820026098, lng: -46.62225174661668, category: "shopping", link: "https://maps.app.goo.gl/XHxKzEZCDUdFgfRN9" },
  { id: "shopping-all-bras", name: "Shopping All Brás", address: "Nº 91", lat: -23.538272192532915, lng: -46.621104704288314, category: "shopping", link: "https://maps.app.goo.gl/TkBbhAcLnvSWVD3s5" },
  { id: "shopping-fabricantes", name: "Shopping dos Fabricantes", address: "Nº 120", lat: -23.538913121313975, lng: -46.62037588894501, category: "shopping", link: "https://maps.app.goo.gl/SFvXTpM8gU7rJkhb7" },
  { id: "shopping-25-marco", name: "Shopping 25 de Março", address: "Nº 402", lat: -23.539691979308472, lng: -46.632215710093604, category: "shopping", link: "https://maps.app.goo.gl/R4DQVi9C5Bse8CCH9" },
  { id: "shopping-juta", name: "Shopping da Juta", address: "Nº 303", lat: -23.539323485925518, lng: -46.619559502437376, category: "shopping", link: "https://maps.app.goo.gl/N3ieNff486FpeRos7" },

  // Feiras
  { id: "feira-madrugada", name: "Feira da Madrugada", address: "Brás, São Paulo", lat: -23.531308141942716, lng: -46.6223344310086, category: "feira" },
  { id: "feirinha-concordia", name: "Feirinha da Concórdia", address: "Nº 873", lat: -23.542112305468006, lng: -46.61802073497502, category: "feira", link: "https://maps.app.goo.gl/cLKH2Luv2ptqFKAXA" },

  // Pontos de Interesse
  { id: "hospital-pari", name: "Hospital Nossa Senhora do Pari", address: "Nº 234", lat: -23.531568246399292, lng: -46.621139904288576, category: "ponto", link: "https://maps.app.goo.gl/qmtBhrow6HYn3h5E6" },
  { id: "paroquia-pari", name: "Paróquia Santo Antônio do Pari", address: "Nº 13", lat: -23.53261504796387, lng: -46.61921521963202, category: "ponto", link: "https://maps.app.goo.gl/CjTieqecxV8paSSa8" },
  { id: "buraco-quente", name: "Buraco Quente", address: "Brás, São Paulo", lat: -23.537700755565663, lng: -46.62104610428838, category: "ponto", link: "https://maps.app.goo.gl/F7EXg62VDMVSoWSc7" },

  // Transporte
  { id: "estacao-bras", name: "Estação Brás", address: "Nº 193 - Metrô Linha 3 Vermelha", lat: -23.544287893989893, lng: -46.616485155707366, category: "transporte", link: "https://maps.app.goo.gl/nKtC3qLjj75j5NAd9" },
  { id: "estacao-armenia", name: "Estação Armênia", address: "Metrô Linha 1 Azul", lat: -23.53560993792278, lng: -46.62512267187318, category: "transporte" },
];

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

function createMarkerSvg(color: string, glyph: string, scale: number = 1): string {
  const w = Math.round(28 * scale);
  const h = Math.round(38 * scale);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 28 38">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="14" cy="13" r="8" fill="white" opacity="0.9"/>
    <text x="14" y="17" text-anchor="middle" fill="${color}" font-size="11" font-weight="bold" font-family="sans-serif">${glyph}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function GoogleMapBras() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setLoaded(true));
      existingScript.addEventListener("error", () => setError(true));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -23.535, lng: -46.621 },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    });

    mapInstanceRef.current = map;

    const infoWindow = new google.maps.InfoWindow();

    gMapPoints.forEach((point) => {
      const cfg = categoryConfig[point.category];
      const isHotel = point.category === "hotel";

      const marker = new google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map,
        title: point.name,
        icon: {
          url: createMarkerSvg(cfg.color, cfg.glyph, isHotel ? 1.3 : 1),
          scaledSize: new google.maps.Size(
            isHotel ? 36 : 28,
            isHotel ? 49 : 38
          ),
          anchor: new google.maps.Point(
            isHotel ? 18 : 14,
            isHotel ? 49 : 38
          ),
        },
        zIndex: isHotel ? 100 : 10,
      });

      marker.addListener("click", () => {
        const mapsButton = point.link
          ? `<a href="${point.link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;padding:6px 12px;background:${cfg.color};color:white;font-size:11px;font-weight:600;text-decoration:none;border-radius:6px;">Abrir no Google Maps</a>`
          : "";

        infoWindow.setContent(
          `<div style="font-family:sans-serif;padding:4px 0;">
            <strong style="font-size:14px;color:${cfg.color};">${point.name}</strong>
            <br/>
            <span style="font-size:12px;color:#666;">${point.address}</span>
            <br/>
            <span style="display:inline-block;margin-top:4px;font-size:11px;color:${cfg.color};font-weight:600;">${cfg.label}</span>
            ${mapsButton}
          </div>`
        );
        infoWindow.open(map, marker);
      });
    });
  }, [loaded]);

  if (error) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-[var(--color-light)] flex items-center justify-center text-[var(--color-text-light)]">
        Nao foi possivel carregar o mapa. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg"
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {Object.entries(categoryConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: val.color }}
            />
            <span className="text-xs text-[var(--color-text-light)]">
              {val.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
