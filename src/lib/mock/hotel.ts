import { HotelInfo, Service, Customer } from "@/types";

export const hotelInfo: HotelInfo = {
  name: "Hotel Brás",
  description:
    "Localizado no bairro do Brás, em São Paulo, o Hotel Brás oferece duas unidades com opções para todos os perfis de hóspede. Com fácil acesso ao comércio local, estações de metrô e principais pontos da cidade, somos a escolha ideal para viajantes de negócios e turistas.",
  logo: "/icon.png",
  address: "Rua Canindé, 469 - Brás",
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
    address: "Rua Canindé, 469 - Brás",
    city: "São Paulo",
    state: "SP",
    zipCode: "03033-000",
  },
  flat: {
    name: "Hotel Brás Flat",
    address: "Rua Canindé, 445 - Brás",
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
    name: "Cafe da Manhã",
    description: "Cafe da Manhã completo das 06:30 as 10:00",
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
    <h3>Política de Cancelamento</h3>
    <ul>
      <li>Cancelamento gratuito até 48 horas antes do check-in</li>
      <li>Cancelamento entre 48h e 24h: cobrança de 50% do valor da primeira diária</li>
      <li>Cancelamento com menos de 24h ou no-show: cobrança integral da primeira diária</li>
    </ul>
  `,
  children: `
    <h3>Política de Crianças</h3>
    <ul>
      <li>Crianças até 6 anos: hospedagem gratuita na cama dos pais</li>
      <li>Crianças de 7 a 12 anos: 50% do valor da diária adicional</li>
      <li>Acima de 12 anos: valor integral</li>
      <li>Berços disponíveis mediante solicitação prévia (sujeito à disponibilidade)</li>
    </ul>
  `,
  pets: `
    <h3>Política de Pets</h3>
    <p>Infelizmente, não aceitamos animais de estimação em nossas dependências, exceto cães-guia para hóspedes com deficiência visual.</p>
  `,
  general: `
    <h3>Regras Gerais</h3>
    <ul>
      <li>Check-in: a partir das 14:00</li>
      <li>Check-out: até as 12:00</li>
      <li>Late check-out sujeito à disponibilidade e cobrança adicional</li>
      <li>Proibido fumar em todas as áreas internas do hotel</li>
      <li>Silêncio obrigatório das 22:00 às 08:00</li>
      <li>Documento de identificação com foto obrigatório no check-in</li>
    </ul>
  `,
};
