import { RoomAvailability, SearchParams } from "@/types";
import { rooms, getRoomWithRates, roomPrices, ratePlans, breakfastPrice, nonRefundableDiscount } from "./rooms";
import { bookings } from "./bookings";

// Simulates checking availability against existing bookings
function isRoomAvailable(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): boolean {
  // Check if there are any overlapping bookings
  const overlapping = bookings.some((booking) => {
    if (booking.roomId !== roomId) return false;
    if (booking.status === "cancelled") return false;

    const bookingCheckIn = new Date(booking.checkIn);
    const bookingCheckOut = new Date(booking.checkOut);

    // Check for overlap
    return checkIn < bookingCheckOut && checkOut > bookingCheckIn;
  });

  return !overlapping;
}

// Simulates random unavailability (for demo purposes)
function simulateAvailability(roomId: string, checkIn: Date): boolean {
  // Use a hash of roomId + date to get consistent "random" availability
  const dateStr = checkIn.toISOString().split("T")[0];
  const hash = (roomId + dateStr).split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  // 85% chance of being available
  return hash % 100 < 85;
}

export async function searchAvailability(
  params: SearchParams
): Promise<RoomAvailability[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { checkIn, checkOut, guests } = params;
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  const results: RoomAvailability[] = [];

  for (const room of rooms) {
    // Filter by occupancy
    if (room.maxOccupancy < guests.adults + guests.children) {
      continue;
    }

    // Check real availability (against bookings)
    const realAvailable = isRoomAvailable(room.id, checkIn, checkOut);

    // Simulate some unavailability
    const simAvailable = simulateAvailability(room.id, checkIn);

    const available = realAvailable && simAvailable;

    // Calculate rates for this room
    const basePrice = roomPrices[room.id];

    const rates = ratePlans.map((rate) => {
      let pricePerNight = basePrice;

      if (rate.id === "breakfast") {
        pricePerNight += breakfastPrice * guests.adults;
      } else if (rate.id === "non-refundable") {
        pricePerNight = basePrice * (1 - nonRefundableDiscount);
      }

      return {
        ...rate,
        pricePerNight: pricePerNight,
      };
    });

    results.push({
      roomId: room.id,
      room,
      rates,
      available,
    });
  }

  // Sort by price (lowest first for available rooms)
  results.sort((a, b) => {
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;
    return roomPrices[a.roomId] - roomPrices[b.roomId];
  });

  return results;
}

export async function checkRoomAvailability(
  roomId: string,
  rateId: string,
  checkIn: Date,
  checkOut: Date
): Promise<{ available: boolean; pricePerNight: number }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const available = isRoomAvailable(roomId, checkIn, checkOut);
  const basePrice = roomPrices[roomId];

  let pricePerNight = basePrice;
  if (rateId === "breakfast") {
    pricePerNight += breakfastPrice * 2; // assuming 2 adults
  } else if (rateId === "non-refundable") {
    pricePerNight = basePrice * (1 - nonRefundableDiscount);
  }

  return { available, pricePerNight };
}

// Get minimum price for display on landing page
export function getMinPrice(roomId: string): number {
  const basePrice = roomPrices[roomId];
  return Math.round(basePrice * (1 - nonRefundableDiscount)); // non-refundable is the cheapest
}

// Get all rooms with their minimum prices
export function getRoomsWithMinPrices(): Array<{
  room: typeof rooms[0];
  minPrice: number;
}> {
  return rooms.map((room) => ({
    room,
    minPrice: getMinPrice(room.id),
  }));
}
