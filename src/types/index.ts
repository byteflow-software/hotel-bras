// Room Types
export interface Room {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  photos: string[];
  maxOccupancy: number;
  beds: string;
  size: number; // m²
  amenities: string[];
  bitzRoomTypeId: string;
}

export interface RatePlan {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  policies: string[];
  cancellationPolicy: string;
  breakfast: boolean;
}

export interface RoomAvailability {
  roomId: string;
  room: Room;
  rates: RatePlan[];
  available: boolean;
}

// Booking Types
export interface Guest {
  adults: number;
  children: number;
  childrenAges?: number[];
}

export interface SearchParams {
  checkIn: Date;
  checkOut: Date;
  guests: Guest;
  propertyId?: string;
}

export interface Hold {
  id: string;
  roomId: string;
  rateId: string;
  checkIn: Date;
  checkOut: Date;
  guests: Guest;
  priceQuote: PriceQuote;
  expiresAt: Date;
  status: "active" | "expired" | "converted";
  createdAt: Date;
}

export interface PriceQuote {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  document?: string;
  createdAt: Date;
}

// Booking Types
export interface Booking {
  id: string;
  code: string;
  holdId: string;
  customerId: string;
  customer: Customer;
  roomId: string;
  room: Room;
  rateId: string;
  ratePlan: RatePlan;
  checkIn: Date;
  checkOut: Date;
  guests: Guest;
  priceQuote: PriceQuote;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded" | "failed";
  paymentMethod?: "pix" | "credit_card";
  bitzBookingId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  asaasChargeId: string;
  amount: number;
  method: "pix" | "credit_card";
  status: "pending" | "confirmed" | "failed" | "expired" | "refunded";
  pixCode?: string;
  pixQrCode?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

// Promo Code Types
export interface PromoCode {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usedCount: number;
  active: boolean;
  createdAt: Date;
}

// Hotel Info Types
export interface HotelInfo {
  name: string;
  description: string;
  logo: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// API Response Types
export interface SearchResponse {
  success: boolean;
  rooms: RoomAvailability[];
  searchParams: SearchParams;
}

export interface HoldResponse {
  success: boolean;
  hold: Hold;
}

export interface CheckoutResponse {
  success: boolean;
  booking: Booking;
  payment: Payment;
}
