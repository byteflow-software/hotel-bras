import { HotelInfo, Service } from "@/types";

export const hotelInfo: HotelInfo = {
  name: "Hotel Bras",
  description:
    "Localizado no coracao do bairro do Bras, em Sao Paulo, o Hotel Bras oferece uma combinacao perfeita de conforto, elegancia e praticidade. Com facil acesso ao comercio local, estacoes de metro e principais pontos turisticos da cidade, somos a escolha ideal para viajantes de negocios e turistas que buscam uma hospedagem de qualidade.",
  logo: "/logo-hotel.jpeg",
  address: "Rua Oriente, 500",
  city: "Sao Paulo",
  state: "SP",
  zipCode: "03016-000",
  phone: "(11) 3333-4444",
  whatsapp: "(11) 99999-8888",
  email: "reservas@hotelbras.com.br",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  coordinates: {
    lat: -23.5475,
    lng: -46.6158,
  },
};

export const services: Service[] = [
  {
    id: "wifi",
    name: "Wi-Fi Gratuito",
    description: "Internet de alta velocidade em todos os ambientes",
    icon: "Wifi",
  },
  {
    id: "breakfast",
    name: "Cafe da Manha",
    description: "Cafe da manha completo das 06:30 as 10:00",
    icon: "Coffee",
  },
  {
    id: "parking",
    name: "Estacionamento",
    description: "Estacionamento privativo com manobrista",
    icon: "Car",
  },
  {
    id: "reception",
    name: "Recepcao 24h",
    description: "Atendimento 24 horas para sua comodidade",
    icon: "Clock",
  },
  {
    id: "aircon",
    name: "Ar Condicionado",
    description: "Climatizacao em todos os quartos",
    icon: "Wind",
  },
  {
    id: "safe",
    name: "Cofre",
    description: "Cofre digital em todos os quartos",
    icon: "Lock",
  },
  {
    id: "laundry",
    name: "Lavanderia",
    description: "Servico de lavanderia express",
    icon: "Shirt",
  },
  {
    id: "roomservice",
    name: "Room Service",
    description: "Servico de quarto disponivel",
    icon: "UtensilsCrossed",
  },
];

export const policies = {
  cancellation: `
    <h3>Politica de Cancelamento</h3>
    <ul>
      <li>Cancelamento gratuito ate 48 horas antes do check-in</li>
      <li>Cancelamento entre 48h e 24h: cobranca de 50% do valor da primeira diaria</li>
      <li>Cancelamento com menos de 24h ou no-show: cobranca integral da primeira diaria</li>
    </ul>
  `,
  children: `
    <h3>Politica de Criancas</h3>
    <ul>
      <li>Criancas ate 6 anos: hospedagem gratuita na cama dos pais</li>
      <li>Criancas de 7 a 12 anos: 50% do valor da diaria adicional</li>
      <li>Acima de 12 anos: valor integral</li>
      <li>Bercos disponiveis mediante solicitacao previa (sujeito a disponibilidade)</li>
    </ul>
  `,
  pets: `
    <h3>Politica de Pets</h3>
    <p>Infelizmente, nao aceitamos animais de estimacao em nossas dependencias, exceto caes-guia para hospedes com deficiencia visual.</p>
  `,
  general: `
    <h3>Regras Gerais</h3>
    <ul>
      <li>Check-in: a partir das 14:00</li>
      <li>Check-out: ate as 12:00</li>
      <li>Late check-out sujeito a disponibilidade e cobranca adicional</li>
      <li>Proibido fumar em todas as areas internas do hotel</li>
      <li>Silencio obrigatorio das 22:00 as 08:00</li>
      <li>Documento de identificacao com foto obrigatorio no check-in</li>
    </ul>
  `,
};
