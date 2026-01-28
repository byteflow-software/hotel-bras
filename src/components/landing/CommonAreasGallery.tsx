"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

interface CommonAreasGalleryProps {
  photos: string[];
  unitName: string;
}

export function CommonAreasGallery({ photos, unitName }: CommonAreasGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = useCallback(() => {
    setCurrentIndex((c) => (c === 0 ? photos.length - 1 : c - 1));
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrentIndex((c) => (c === photos.length - 1 ? 0 : c + 1));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, prev, next]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  if (photos.length === 0) return null;

  // Grid layout depends on number of photos
  const gridClass =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 2
        ? "grid-cols-2"
        : photos.length === 3
          ? "grid-cols-2"
          : "grid-cols-2";

  return (
    <>
      {/* Photo Grid */}
      <div className={`grid ${gridClass} gap-1 bg-black/10 min-h-[300px] lg:min-h-[400px]`}>
        {photos.slice(0, 4).map((photo, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden group cursor-pointer ${
              photos.length === 3 && index === 0 ? "row-span-2" : ""
            } ${photos.length === 1 ? "col-span-2" : ""}`}
          >
            <Image
              src={photo}
              alt={`Área comum ${index + 1} - ${unitName}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                <Images className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>

            {/* Show "+X more" on last visible photo if there are more */}
            {index === 3 && photos.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{photos.length - 4}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Counter & Title */}
          <div className="absolute top-4 left-4 text-white/80 text-sm">
            <span className="font-medium">Áreas Comuns - {unitName}</span>
            <span className="mx-2">|</span>
            <span>{currentIndex + 1} / {photos.length}</span>
          </div>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[currentIndex]}
              alt={`Área comum ${currentIndex + 1} - ${unitName}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4 py-2">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    i === currentIndex
                      ? "ring-2 ring-white scale-110"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-xs hidden md:block">
            Use as setas do teclado para navegar | ESC para fechar
          </div>
        </div>
      )}
    </>
  );
}
