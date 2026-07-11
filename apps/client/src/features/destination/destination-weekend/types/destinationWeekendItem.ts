import { AccommodationTag } from '@repo/database';

export type DestinationWeekendItemProps = {
  accommodationId: string;
  accommodationTitle: string;
  accommodationTag: AccommodationTag;
  price: number;
  rating: number;
  city: string;
  country: string;
  discount?: number;
  reviewCount: number;
  isFavourite?: boolean;
  currencySymbol: string;
};
