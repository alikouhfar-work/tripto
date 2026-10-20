import { AccommodationTag } from '@repo/database';

type DestinationCardWithoutTagProps = {
  showAccommodationTag?: false;
};

type DestinationCardWithTagProps = {
  showAccommodationTag: true;
  accommodationTag: AccommodationTag;
};

type DestinationCardBaseProps = {
  accommodationId: string;
  accommodationTitle: string;
  price: number;
  rating: number;
  city: string;
  country: string;
  discount?: number;
  reviewCount: number;
  isFavourite?: boolean;
  currencySymbol: string;
};

export type DestinationCardProps = DestinationCardBaseProps &
  (DestinationCardWithTagProps | DestinationCardWithoutTagProps);

export type DestinationCardSkeletonProps = {
  className?: string;
  showAccommodationTag?: boolean;
};
