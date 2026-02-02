"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Train,
  ShoppingBag,
  Store,
  Building2,
  Navigation,
} from "lucide-react";
import { unitAddresses } from "@/lib/mock";

declare global {
  interface Window {
    google: typeof google;
  }
}

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

const HOTEL_LOCATION = {
  lat: -23.53034373754878,
  lng: -46.623192753650684,
  name: "Hotel Brás - Unidade Autônoma",
  address: "Rua Canindé, 469 - Brás",
};

function createHotelMarkerSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="49" viewBox="0 0 28 38">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="#3D2B1F" stroke="white" stroke-width="1.5"/>
    <circle cx="14" cy="13" r="8" fill="white" opacity="0.9"/>
    <text x="14" y="17" text-anchor="middle" fill="#3D2B1F" font-size="11" font-weight="bold" font-family="sans-serif">H</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function MiniMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => setLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: HOTEL_LOCATION.lat, lng: HOTEL_LOCATION.lng },
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      gestureHandling: "cooperative",
      styles: [
        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
      ],
    });

    mapInstanceRef.current = map;

    const marker = new google.maps.Marker({
      position: { lat: HOTEL_LOCATION.lat, lng: HOTEL_LOCATION.lng },
      map,
      title: HOTEL_LOCATION.name,
      icon: {
        url: createHotelMarkerSvg(),
        scaledSize: new google.maps.Size(36, 49),
        anchor: new google.maps.Point(18, 49),
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="font-family:sans-serif;padding:4px 0;">
        <strong style="font-size:13px;color:#3D2B1F;">${HOTEL_LOCATION.name}</strong><br/>
        <span style="font-size:11px;color:#666;">${HOTEL_LOCATION.address}</span>
      </div>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }, [loaded]);

  return (
    <Link href="/localizacao" className="block">
      <div
        ref={mapRef}
        className="w-full h-[180px] rounded-xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow cursor-pointer"
      />
      <p className="text-xs text-center text-[var(--color-accent)] mt-2 hover:underline">
        Ver mapa completo →
      </p>
    </Link>
  );
}

const pointsOfInterest = {
  transporte: {
    icon: Train,
    title: "Transporte",
    color: "text-green-600",
    bgColor: "bg-green-100",
    items: [
      { name: "Estação Armênia", detail: "Metrô Linha 1 Azul", distance: "900m" },
      { name: "Estação Brás", detail: "Metrô Linha 3 Vermelha", distance: "1.5km" },
    ],
  },
  feiras: {
    icon: Store,
    title: "Feiras",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    items: [
      { name: "Feira da Madrugada", detail: "Maior centro de compras populares", distance: "300m" },
      { name: "Feirinha da Concórdia", detail: "Artigos diversos", distance: "1.2km" },
    ],
  },
  shoppings: {
    icon: ShoppingBag,
    title: "Shoppings",
    color: "text-red-600",
    bgColor: "bg-red-100",
    items: [
      { name: "Shopping Vautier", detail: "Moda atacado e varejo", distance: "400m" },
      { name: "Galeria Pagé Brás", detail: "Comércio popular", distance: "350m" },
      { name: "Shopping 25 de Março", detail: "Centro de compras", distance: "1.8km" },
    ],
  },
  pontos: {
    icon: Building2,
    title: "Pontos de Interesse",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    items: [
      { name: "Mercado Municipal", detail: "Gastronomia e produtos típicos", distance: "2km" },
      { name: "Museu Catavento", detail: "Ciência e cultura", distance: "1.5km" },
      { name: "Pinacoteca", detail: "Arte e história", distance: "2.5km" },
    ],
  },
};

export function LocationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[var(--color-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            Localização Privilegiada
          </h2>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">
            No coração do Brás, com fácil acesso ao metrô, feiras, shoppings e aos
            principais pontos de interesse de São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Addresses */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[var(--color-accent)]" />
              Nossas Unidades
            </h3>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-primary)] rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--color-primary)] mb-1">
                      {unitAddresses.autonoma.name}
                    </h4>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {unitAddresses.autonoma.address}
                    </p>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {unitAddresses.autonoma.city} - {unitAddresses.autonoma.state} | CEP: {unitAddresses.autonoma.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-primary)] rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--color-primary)] mb-1">
                      {unitAddresses.flat.name}
                    </h4>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {unitAddresses.flat.address}
                    </p>
                    <p className="text-sm text-[var(--color-text-light)]">
                      {unitAddresses.flat.city} - {unitAddresses.flat.state} | CEP: {unitAddresses.flat.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <MiniMap />
            </div>
          </div>

          {/* Right - Points of Interest */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-primary)] mb-6">
              O Que Tem Por Perto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(pointsOfInterest).map(([key, category]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${category.bgColor} rounded-lg`}>
                      <category.icon className={`w-4 h-4 ${category.color}`} />
                    </div>
                    <h4 className="font-semibold text-[var(--color-primary)]">
                      {category.title}
                    </h4>
                  </div>

                  <ul className="space-y-3">
                    {category.items.slice(0, 2).map((item) => (
                      <li key={item.name} className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--color-text)] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[var(--color-text-light)] truncate">
                            {item.detail}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-[var(--color-accent)] whitespace-nowrap">
                          {item.distance}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-[var(--border)]">
                <p className="text-2xl font-bold text-[var(--color-accent)]">30+</p>
                <p className="text-xs text-[var(--color-text-light)]">Shoppings</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-[var(--border)]">
                <p className="text-2xl font-bold text-[var(--color-accent)]">900m</p>
                <p className="text-xs text-[var(--color-text-light)]">Do Metrô</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-[var(--border)]">
                <p className="text-2xl font-bold text-[var(--color-accent)]">300m</p>
                <p className="text-xs text-[var(--color-text-light)]">Da Feira</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
