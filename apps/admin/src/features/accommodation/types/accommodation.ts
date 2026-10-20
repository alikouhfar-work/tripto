import { AccommodationAmenity } from './accommodationAmenity';
import { AccommodationPolicy } from './accommodationPolicy';
import { AccommodationTag } from '@/features/accommodation-tag/types/accommodationTag';
import { Room } from '@/features/accommodation/hotel/types/room';

export type Accommodation = {
  id: string;
  title: string;
  description: string;
  destinationId: string | null;
  country: string;
  countryCode: string;
  city: string;
  fullAddress: string;
  latitude: number | null;
  longitude: number | null;
  amenities: JSON;
  policies: JSON;
  favoriteCount: number;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
  tagId: string;
};
export type AccommodationType = 'HOUSE' | 'HOTEL';

export type Hotel = {
  id: string;
  rooms: Array<Room>;
  accommodationId: string;
  createdById: string | null;
  updatedById: string | null;
};

export type House = {
  id: string;
  area: number;
  price: number;
  floors: number;
  bedrooms: number;
  capacity: number;
  bathrooms: number;
  currencyId: string;
  currency?: {
    symbol: string;
    isoCode: string;
  };
  accommodationId: string;
  discount: number | null;
  availableDates: JSON | null;
  createdById: string | null;
  updatedById: string | null;
};

export type AccommodationDetails = Accommodation & {
  house: House | null;
  hotel: Hotel | null;
  tag: AccommodationTag;
  destination: { city: string; country: string } | null;
};

export type AccommodationColumns = {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  city: string;
  tag: AccommodationTag;
  type?: AccommodationType;
  policies: Array<AccommodationPolicy>;
  amenities: Array<AccommodationAmenity>;
};
