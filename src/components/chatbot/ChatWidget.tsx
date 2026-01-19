"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Clock,
  CreditCard,
  MapPin,
  Users,
  Phone,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hotelInfo } from "@/lib/mock";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const initialMessage: Message = {
  id: "welcome",
  type: "bot",
  content: "Ola! Bem-vindo ao Hotel Bras. Como posso ajudar voce hoje?",
  options: [
    { label: "Horarios", value: "horarios", icon: <Clock className="w-4 h-4" /> },
    {
      label: "Pagamentos",
      value: "pagamentos",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      label: "Localizacao",
      value: "localizacao",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      label: "Politicas",
      value: "politicas",
      icon: <Users className="w-4 h-4" />,
    },
  ],
};

const responses: Record<string, Message> = {
  horarios: {
    id: "horarios",
    type: "bot",
    content: `Nossos horarios:\n\n- Check-in: a partir das ${hotelInfo.checkInTime}\n- Check-out: ate as ${hotelInfo.checkOutTime}\n- Cafe da manha: 06:30 as 10:00\n- Recepcao: 24 horas\n\nPosso ajudar com mais alguma coisa?`,
    options: [
      {
        label: "Reservar agora",
        value: "reservar",
        icon: <Calendar className="w-4 h-4" />,
      },
      { label: "Outras duvidas", value: "menu", icon: <ArrowRight className="w-4 h-4" /> },
      {
        label: "Falar com atendente",
        value: "atendente",
        icon: <Phone className="w-4 h-4" />,
      },
    ],
  },
  pagamentos: {
    id: "pagamentos",
    type: "bot",
    content:
      "Aceitamos as seguintes formas de pagamento:\n\n- Pix (pagamento instantaneo)\n- Cartao de credito (Visa, Mastercard, Elo)\n- Cartao de debito\n\nO pagamento e realizado no momento da reserva online ou no check-in para reservas presenciais.",
    options: [
      {
        label: "Reservar agora",
        value: "reservar",
        icon: <Calendar className="w-4 h-4" />,
      },
      { label: "Outras duvidas", value: "menu", icon: <ArrowRight className="w-4 h-4" /> },
      {
        label: "Falar com atendente",
        value: "atendente",
        icon: <Phone className="w-4 h-4" />,
      },
    ],
  },
  localizacao: {
    id: "localizacao",
    type: "bot",
    content: `Estamos localizados no coracao do Bras:\n\n${hotelInfo.address}\n${hotelInfo.city} - ${hotelInfo.state}\nCEP: ${hotelInfo.zipCode}\n\nFicamos a 300m da estacao de metro Bras (Linha Vermelha).`,
    options: [
      {
        label: "Ver no mapa",
        value: "mapa",
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        label: "Reservar agora",
        value: "reservar",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        label: "Falar com atendente",
        value: "atendente",
        icon: <Phone className="w-4 h-4" />,
      },
    ],
  },
  politicas: {
    id: "politicas",
    type: "bot",
    content:
      "Nossas principais politicas:\n\n- Cancelamento gratuito ate 48h antes\n- Criancas ate 6 anos: gratuito\n- Nao aceitamos pets\n- Proibido fumar nas areas internas\n\nPara mais detalhes, acesse nossa pagina de politicas.",
    options: [
      {
        label: "Ver politicas completas",
        value: "politicas_link",
        icon: <ArrowRight className="w-4 h-4" />,
      },
      {
        label: "Reservar agora",
        value: "reservar",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        label: "Falar com atendente",
        value: "atendente",
        icon: <Phone className="w-4 h-4" />,
      },
    ],
  },
  menu: {
    id: "menu",
    type: "bot",
    content: "Claro! Sobre o que voce gostaria de saber?",
    options: [
      { label: "Horarios", value: "horarios", icon: <Clock className="w-4 h-4" /> },
      {
        label: "Pagamentos",
        value: "pagamentos",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        label: "Localizacao",
        value: "localizacao",
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        label: "Politicas",
        value: "politicas",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  atendente: {
    id: "atendente",
    type: "bot",
    content: `Voce pode falar diretamente com nossa equipe:\n\n- WhatsApp: ${hotelInfo.whatsapp}\n- Telefone: ${hotelInfo.phone}\n- E-mail: ${hotelInfo.email}\n\nEstamos disponiveis 24 horas!`,
    options: [
      {
        label: "Abrir WhatsApp",
        value: "whatsapp",
        icon: <MessageCircle className="w-4 h-4" />,
      },
      { label: "Voltar ao menu", value: "menu", icon: <ArrowRight className="w-4 h-4" /> },
    ],
  },
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const handleOptionClick = (value: string) => {
    // Handle special actions
    if (value === "reservar") {
      window.location.href = "/reservas";
      return;
    }
    if (value === "mapa") {
      window.location.href = "/localizacao";
      return;
    }
    if (value === "politicas_link") {
      window.location.href = "/politicas";
      return;
    }
    if (value === "whatsapp") {
      window.open(
        `https://wa.me/55${hotelInfo.whatsapp.replace(/\D/g, "")}`,
        "_blank"
      );
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content:
        responses[value]?.id === "menu"
          ? "Outras duvidas"
          : value.charAt(0).toUpperCase() + value.slice(1),
    };

    // Get bot response
    const botResponse = responses[value] || responses.menu;

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          isOpen
            ? "bg-[var(--color-text)] text-white"
            : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]"
        )}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[var(--color-primary)] text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-semibold">Hotel Bras</h3>
              <p className="text-sm text-white/80">Assistente Virtual</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={`${message.id}-${index}`}>
              <div
                className={cn(
                  "max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line",
                  message.type === "bot"
                    ? "bg-[var(--color-light)] text-[var(--color-text)]"
                    : "bg-[var(--color-accent)] text-white ml-auto"
                )}
              >
                {message.content}
              </div>

              {/* Options */}
              {message.options && message.type === "bot" && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option.value)}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-[var(--color-accent)] text-[var(--color-accent)] rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--color-lighter)]">
          <Button asChild className="w-full">
            <Link href="/reservas">
              <Calendar className="w-4 h-4 mr-2" />
              Reservar Agora
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
