import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hotelbras.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hotel Brás - Hospedagem em São Paulo | Brás",
    template: "%s | Hotel Brás",
  },
  description:
    "Hotel Brás oferece hospedagem confortável no bairro do Brás, São Paulo. Duas unidades com quartos equipados, WiFi grátis, café da manhã e excelente localização.",
  keywords: [
    "hotel são paulo",
    "hospedagem brás",
    "hotel brás",
    "hotel barato são paulo",
    "pousada são paulo",
    "quartos brás",
    "acomodações são paulo",
    "hotel próximo metrô",
    "hotel centro são paulo",
    "hospedagem econômica",
    "hotel com café da manhã",
    "hotel wifi grátis",
  ],
  authors: [{ name: "Hotel Brás" }],
  creator: "Hotel Brás",
  publisher: "Hotel Brás",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Hotel Brás - Hospedagem em São Paulo | Brás",
    description:
      "Hospedagem confortável no Brás, São Paulo. Duas unidades, quartos equipados, WiFi grátis e café da manhã. Reserve agora!",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Hotel Brás",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Hotel Brás - Hospedagem em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Brás - Hospedagem em São Paulo",
    description:
      "Hospedagem confortável no Brás, São Paulo. Reserve agora!",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "travel",
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
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
