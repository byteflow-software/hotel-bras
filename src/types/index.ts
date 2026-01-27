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
