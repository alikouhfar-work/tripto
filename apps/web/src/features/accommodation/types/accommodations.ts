import { Accommodation } from '@/features/accommodation/types/accommodation';

export type AccommodationsProps = {
  city: string;
  totalPages: number;
  totalCount: number;
  accommodations: Accommodation[];
};

export type AccommodationsPaginationProps = {
  skip: number;
  take: number;
  totalPages: number;
  currentPage: number;
  isNextPageDisabled: boolean;
  isPreviousPageDisabled: boolean;
  onSkipChange: (skip: number) => void;
};

export type AccommodationsPageProps = {
  searchParams: Promise<{ skip: number; take: number }>;
};

export type GetAccommodationsParams = {
  skip: number;
  take: number;
};

export type GetAccommodationsResponse = {
  city: string;
  totalCount: number;
  totalPages: number;
  accommodations: Accommodation[];
}