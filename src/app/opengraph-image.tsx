import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hotel Brás — Hospedagem no Brás, São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1a3a5c 0%, #0f2237 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 24,
            lineHeight: 1.05,
          }}
        >
          Hotel Brás
        </div>
        <div
          style={{
            fontSize: 40,
            opacity: 0.92,
            marginBottom: 48,
            maxWidth: 950,
            lineHeight: 1.3,
          }}
        >
          Hospedagem no bairro do Brás, São Paulo
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 26,
            opacity: 0.85,
          }}
        >
          <span>WiFi grátis</span>
          <span>•</span>
          <span>Café da manhã</span>
          <span>•</span>
          <span>Recepção 24h</span>
        </div>
        <div
          style={{
            marginTop: 60,
            fontSize: 24,
            opacity: 0.7,
          }}
        >
          hotelbras.com
        </div>
      </div>
    ),
    { ...size },
  );
}
