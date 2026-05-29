import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { LogoProvider } from "@/contexts/LogoContext";
import { getSiteLogo } from "@/app/gerenciar/configuracoes/actions";

const GOOGLE_TAG_ID = "G-GKH867J8Y4";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hotelbras.com";

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
        url: "/logo-hotel.jpeg",
        width: 1200,
        height: 630,
        alt: "Hotel Brás - Hospedagem em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Brás - Hospedagem em São Paulo",
    description:
      "Hospedagem confortável no Brás, São Paulo. Reserve agora!",
    images: ["/logo-hotel.jpeg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "travel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logo = await getSiteLogo();

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Raleway:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": `${siteUrl}/#hotel`,
              name: "Hotel Brás",
              description:
                "Hospedagem confortável no bairro do Brás, São Paulo. Duas unidades com quartos equipados, WiFi grátis, café da manhã e excelente localização.",
              url: siteUrl,
              telephone: "+551133264952",
              email: "reservas@hotelbras.com.br",
              image: [`${siteUrl}/logo-hotel.jpeg`],
              logo: `${siteUrl}/logo.png`,
              priceRange: "$$",
              currenciesAccepted: "BRL",
              paymentAccepted: "Cash, Credit Card, Pix",
              checkinTime: "14:00",
              checkoutTime: "12:00",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rua Canindé, 469",
                addressLocality: "São Paulo",
                addressRegion: "SP",
                postalCode: "03033-000",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -23.5279,
                longitude: -46.6187,
              },
              areaServed: {
                "@type": "City",
                name: "São Paulo",
              },
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Wi-Fi Gratuito", value: true },
                { "@type": "LocationFeatureSpecification", name: "Café da Manhã", value: true },
                { "@type": "LocationFeatureSpecification", name: "Recepção 24 horas", value: true },
                { "@type": "LocationFeatureSpecification", name: "Ar Condicionado", value: true },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "reservations",
                  telephone: "+551133264952",
                  email: "reservas@hotelbras.com.br",
                  areaServed: "BR",
                  availableLanguage: ["Portuguese"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  telephone: "+5511984538996",
                  areaServed: "BR",
                  availableLanguage: ["Portuguese"],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "Hotel Brás",
              inLanguage: "pt-BR",
              publisher: { "@id": `${siteUrl}/#hotel` },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `}
        </Script>
        <LogoProvider initialLogo={logo}>
          {children}
        </LogoProvider>
      </body>
    </html>
  );
}
