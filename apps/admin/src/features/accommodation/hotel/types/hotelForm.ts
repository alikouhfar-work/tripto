import type { FormState } from '@/server/form-state';
import { AccommodationDetails } from '../../types/accommodation';
import { AccommodationAmenity } from '../../types/accommodationAmenity';
import { AccommodationPolicy } from '../../types/accommodationPolicy';

export type HotelFormProps = {
  initialData?: AccommodationDetails;
  state?: FormState;
};

export type HotelFormData = {
  title: string;
  tagId: string;
  description: string;
  policies: Array<AccommodationPolicy>;
  amenities: Array<AccommodationAmenity>;

  country: string;
  city: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  fullAddress: string;
};
