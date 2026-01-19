import { Booking, Customer, Payment, PromoCode, Hold, PriceQuote } from "@/types";
import { rooms, roomPrices, ratePlans } from "./rooms";

// Mock customers
export const customers: Customer[] = [
  {
    id: "cust-001",
    name: "Maria Silva Santos",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    document: "123.456.789-00",
    createdAt: new Date("2025-10-15"),
  },
  {
    id: "cust-002",
    name: "Joao Pedro Oliveira",
    email: "joao.oliveira@email.com",
    phone: "(11) 91234-5678",
    document: "987.654.321-00",
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "cust-003",
    name: "Ana Carolina Ferreira",
    email: "ana.ferreira@email.com",
    phone: "(21) 99876-5432",
    document: "456.789.123-00",
    createdAt: new Date("2025-12-05"),
  },
  {
    id: "cust-004",
    name: "Carlos Eduardo Lima",
    email: "carlos.lima@email.com",
    phone: "(11) 97654-3210",
    document: "789.123.456-00",
    createdAt: new Date("2026-01-02"),
  },
];

// Mock bookings
export const bookings: Booking[] = [
  {
    id: "book-001",
    code: "HBR4K7M2",
    holdId: "hold-001",
    customerId: "cust-001",
    customer: customers[0],
    roomId: "superior-double",
    room: rooms.find((r) => r.id === "superior-double")!,
    rateId: "breakfast",
    ratePlan: { ...ratePlans[1], pricePerNight: 370 },
    checkIn: new Date("2026-01-25"),
    checkOut: new Date("2026-01-28"),
    guests: { adults: 2, children: 0 },
    priceQuote: {
      nights: 3,
      pricePerNight: 370,
      subtotal: 1110,
      taxes: 55.5,
      discount: 0,
      total: 1165.5,
    },
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "pix",
    bitzBookingId: "BITZ-2026-00123",
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-10"),
  },
  {
    id: "book-002",
    code: "HBX9L3N5",
    holdId: "hold-002",
    customerId: "cust-002",
    customer: customers[1],
    roomId: "luxo-double",
    room: rooms.find((r) => r.id === "luxo-double")!,
    rateId: "standard",
    ratePlan: { ...ratePlans[0], pricePerNight: 350 },
    checkIn: new Date("2026-02-01"),
    checkOut: new Date("2026-02-05"),
    guests: { adults: 2, children: 1, childrenAges: [8] },
    priceQuote: {
      nights: 4,
      pricePerNight: 350,
      subtotal: 1400,
      taxes: 70,
      discount: 0,
      total: 1470,
    },
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "credit_card",
    bitzBookingId: "BITZ-2026-00124",
    createdAt: new Date("2026-01-12"),
    updatedAt: new Date("2026-01-12"),
  },
  {
    id: "book-003",
    code: "HBP2M8Q1",
    holdId: "hold-003",
    customerId: "cust-003",
    customer: customers[2],
    roomId: "suite-master",
    room: rooms.find((r) => r.id === "suite-master")!,
    rateId: "breakfast",
    ratePlan: { ...ratePlans[1], pricePerNight: 630 },
    checkIn: new Date("2026-02-14"),
    checkOut: new Date("2026-02-16"),
    guests: { adults: 2, children: 0 },
    priceQuote: {
      nights: 2,
      pricePerNight: 630,
      subtotal: 1260,
      taxes: 63,
      discount: 126,
      total: 1197,
      couponCode: "LOVE10",
    },
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "pix",
    bitzBookingId: "BITZ-2026-00125",
    notes: "Reserva especial para Dia dos Namorados",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "book-004",
    code: "HBT5R2W9",
    holdId: "hold-004",
    customerId: "cust-004",
    customer: customers[3],
    roomId: "standard-double",
    room: rooms.find((r) => r.id === "standard-double")!,
    rateId: "non-refundable",
    ratePlan: { ...ratePlans[2], pricePerNight: 187 },
    checkIn: new Date("2026-01-20"),
    checkOut: new Date("2026-01-22"),
    guests: { adults: 2, children: 0 },
    priceQuote: {
      nights: 2,
      pricePerNight: 187,
      subtotal: 374,
      taxes: 18.7,
      discount: 0,
      total: 392.7,
    },
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "pix",
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
  },
];

// Mock payments
export const payments: Payment[] = [
  {
    id: "pay-001",
    bookingId: "book-001",
    asaasChargeId: "chr_123456789",
    amount: 1165.5,
    method: "pix",
    status: "confirmed",
    pixCode: "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000",
    createdAt: new Date("2026-01-10"),
    confirmedAt: new Date("2026-01-10"),
  },
  {
    id: "pay-002",
    bookingId: "book-002",
    asaasChargeId: "chr_987654321",
    amount: 1470,
    method: "credit_card",
    status: "confirmed",
    createdAt: new Date("2026-01-12"),
    confirmedAt: new Date("2026-01-12"),
  },
  {
    id: "pay-003",
    bookingId: "book-003",
    asaasChargeId: "chr_456789123",
    amount: 1197,
    method: "pix",
    status: "confirmed",
    pixCode: "00020126580014br.gov.bcb.pix0136789a1234-e12b-12d1-a456-426614174000",
    createdAt: new Date("2026-01-15"),
    confirmedAt: new Date("2026-01-15"),
  },
  {
    id: "pay-004",
    bookingId: "book-004",
    asaasChargeId: "chr_111222333",
    amount: 392.7,
    method: "pix",
    status: "pending",
    pixCode: "00020126580014br.gov.bcb.pix0136111b2222-e12b-12d1-a456-426614174000",
    pixQrCode: "data:image/png;base64,mockQrCodeBase64",
    createdAt: new Date("2026-01-18"),
  },
];

// Mock promo codes
export const promoCodes: PromoCode[] = [
  {
    id: "promo-001",
    code: "BEMVINDO10",
    description: "10% de desconto na primeira reserva",
    type: "percentage",
    value: 10,
    validFrom: new Date("2026-01-01"),
    validTo: new Date("2026-12-31"),
    usageLimit: 100,
    usedCount: 12,
    active: true,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "promo-002",
    code: "LOVE10",
    description: "10% de desconto para Dia dos Namorados",
    type: "percentage",
    value: 10,
    validFrom: new Date("2026-02-01"),
    validTo: new Date("2026-02-28"),
    usageLimit: 50,
    usedCount: 8,
    active: true,
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "promo-003",
    code: "FIMDESEMANA50",
    description: "R$ 50 de desconto em reservas de fim de semana",
    type: "fixed",
    value: 50,
    validFrom: new Date("2026-01-01"),
    validTo: new Date("2026-03-31"),
    usedCount: 23,
    active: true,
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "promo-004",
    code: "VERAO20",
    description: "20% de desconto - Promocao de Verao",
    type: "percentage",
    value: 20,
    validFrom: new Date("2025-12-01"),
    validTo: new Date("2026-02-28"),
    usageLimit: 200,
    usedCount: 45,
    active: true,
    createdAt: new Date("2025-12-01"),
  },
];

// Hold storage (in-memory for mock)
let holds: Hold[] = [];

export function createHold(data: Omit<Hold, "id" | "createdAt" | "status">): Hold {
  const hold: Hold = {
    ...data,
    id: `hold-${Date.now()}`,
    status: "active",
    createdAt: new Date(),
  };
  holds.push(hold);
  return hold;
}

export function getHold(holdId: string): Hold | undefined {
  const hold = holds.find((h) => h.id === holdId);
  if (hold && hold.status === "active" && new Date() > hold.expiresAt) {
    hold.status = "expired";
  }
  return hold;
}

export function convertHold(holdId: string): void {
  const hold = holds.find((h) => h.id === holdId);
  if (hold) {
    hold.status = "converted";
  }
}

export function validatePromoCode(code: string): PromoCode | null {
  const promo = promoCodes.find(
    (p) =>
      p.code.toUpperCase() === code.toUpperCase() &&
      p.active &&
      new Date() >= p.validFrom &&
      new Date() <= p.validTo &&
      (!p.usageLimit || p.usedCount < p.usageLimit)
  );
  return promo || null;
}

export function applyPromoCode(subtotal: number, promoCode: PromoCode): number {
  if (promoCode.type === "percentage") {
    return subtotal * (promoCode.value / 100);
  }
  return Math.min(promoCode.value, subtotal);
}

export function calculatePriceQuote(
  roomId: string,
  rateId: string,
  checkIn: Date,
  checkOut: Date,
  guests: { adults: number; children: number },
  couponCode?: string
): PriceQuote {
  const basePrice = roomPrices[roomId];
  const rate = ratePlans.find((r) => r.id === rateId)!;

  let pricePerNight = basePrice;
  if (rateId === "breakfast") {
    pricePerNight += 45 * guests.adults; // cafe da manha por adulto
  } else if (rateId === "non-refundable") {
    pricePerNight = basePrice * 0.85; // 15% desconto
  }

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );
  const subtotal = pricePerNight * nights;
  const taxes = subtotal * 0.05; // 5% ISS

  let discount = 0;
  if (couponCode) {
    const promo = validatePromoCode(couponCode);
    if (promo) {
      discount = applyPromoCode(subtotal, promo);
    }
  }

  return {
    nights,
    pricePerNight,
    subtotal,
    taxes,
    discount,
    total: subtotal + taxes - discount,
    couponCode: discount > 0 ? couponCode : undefined,
  };
}
