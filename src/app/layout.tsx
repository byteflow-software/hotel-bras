import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Bras - Hospedagem no coracao de Sao Paulo",
  description:
    "Bem-vindo ao Hotel Bras. Conforto, elegancia e localizacao privilegiada no coracao de Sao Paulo. Reserve agora e desfrute de uma experiencia unica.",
  keywords: [
    "hotel",
    "hospedagem",
    "sao paulo",
    "bras",
    "quartos",
    "acomodacoes",
  ],
  authors: [{ name: "Hotel Bras" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Hotel Bras - Hospedagem no coracao de Sao Paulo",
    description:
      "Conforto, elegancia e localizacao privilegiada. Reserve agora!",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
