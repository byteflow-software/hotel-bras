"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ImageCarouselProps {
  photos: string[];
  alt: string;
  aspectRatio?: "video" | "square" | "tall";
}

export function ImageCarousel({
  photos,
  alt,
  aspectRatio = "video",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, prev, next]);

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
        Sem fotos
      </div>
    );
  }

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "tall"
        ? "aspect-[3/4]"
        : "aspect-video";

  return (
    <>
      <div className="relative group">
        {/* Main image */}
        <div
          className={`relative ${aspectClass} rounded-2xl overflow-hidden shadow-lg cursor-pointer`}
          onClick={() => setIsFullscreen(true)}
        >
          <Image
            src={photos[current]}
            alt={`${alt} - Foto ${current + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Fullscreen hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-3">
              <Expand className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
          </>
        )}

        {/* Dots */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-white w-5"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Ver foto ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {photos.length > 1 && (
          <span className="absolute top-3 right-3 text-xs bg-black/50 text-white px-2 py-1 rounded-full">
            {current + 1}/{photos.length}
          </span>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm">
            {current + 1} / {photos.length}
          </div>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[current]}
              alt={`${alt} - Foto ${current + 1}`}
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
                    setCurrent(i);
                  }}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    i === current
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
