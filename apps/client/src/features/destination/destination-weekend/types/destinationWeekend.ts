import { AccommodationTag } from '@repo/database';

export type DestinationWeekend = {
  accommodationId: string;
  accommodationTitle: string;
  accommodationTag: AccommodationTag;
  price: number;
  city: string;
  country: string;
  currencySymbol: string;
};
