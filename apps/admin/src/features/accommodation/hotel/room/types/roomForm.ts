import { AccommodationAmenity } from '@/features/accommodation/types/accommodationAmenity';
import { Currency } from '@repo/database';

export type Beds = {
  king?: number;
  queen?: number;
  double?: number;
  single?: number;
};

export type RoomFormData = {
  id?: string;
  title: string;
  area: number;
  count: number;
  price: number;
  currencyId: string;
  discount?: number | null;
  capacity: number;
  bedrooms?: number | null;
  bathrooms: number;
  amenities: Array<AccommodationAmenity>;
  beds?: Beds;
};

export type RoomDetails = {
  id: string;
  title: string;
  area: number;
  count: number;
  price: number;
  discount: number | null;
  capacity: number;
  bedrooms: number | null;
  bathrooms: number;
  currency: Currency;
  currencyId: string;
  amenities: Array<AccommodationAmenity>;
  galleryImages: string[];
};