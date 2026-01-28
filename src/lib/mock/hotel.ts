import { HotelInfo, Service, Customer } from "@/types";

export const hotelInfo: HotelInfo = {
  name: "Hotel Brás",
  description:
    "Localizado no bairro do Canindé, em São Paulo, o Hotel Brás oferece duas unidades com opções para todos os perfis de hóspede. Com fácil acesso ao comércio local, estações de metrô e principais pontos da cidade, somos a escolha ideal para viajantes de negócios e turistas.",
  logo: "/logo.png",
  address: "Rua Canindé, 469 - Canindé",
  city: "São Paulo",
  state: "SP",
  zipCode: "03033-000",
  phone: "(11) 3326-4952",
  whatsapp: "(11) 98453-8996",
  email: "reservas@hotelbras.com.br",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  coordinates: {
    lat: -23.5279,
    lng: -46.6187,
  },
};

export const unitAddresses = {
  autonoma: {
    name: "Hotel Brás - Unidade Autônoma",
    address: "Rua Canindé, 469 - Canindé",
    city: "São Paulo",
    state: "SP",
    zipCode: "03033-000",
  },
  flat: {
    name: "Hotel Brás Flat",
    address: "Rua Canindé, 445 - Canindé",
    city: "São Paulo",
    state: "SP",
    zipCode: "03033-000",
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
];

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Carlos Silva",
    email: "carlos.silva@email.com",
    phone: "(11) 98765-4321",
    document: "123.456.789-00",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "cust-2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 91234-5678",
    document: "987.654.321-00",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "cust-3",
    name: "Joao Oliveira",
    email: "joao.oliveira@email.com",
    phone: "(21) 99876-5432",
    document: "456.789.123-00",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "cust-4",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 97654-3210",
    document: "321.654.987-00",
    createdAt: new Date("2024-04-05"),
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
