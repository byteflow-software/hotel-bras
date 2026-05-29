import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Hotel Brás",
  description:
    "Fale com o Hotel Brás. Telefone (11) 3326-4952, WhatsApp (11) 98453-8996, e-mail reservas@hotelbras.com.br. Rua Canindé, 469 - Brás, São Paulo.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | Hotel Brás",
    description:
      "Reservas e dúvidas: (11) 3326-4952 ou WhatsApp (11) 98453-8996. Rua Canindé, 469 - Brás, São Paulo.",
    url: "/contato",
    type: "website",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
