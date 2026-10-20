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

export type RawDestinationWeekendResult = {
  accommodation_id: number;
  accommodation_title: number;
  tag_title: string;
  tag_emoji: string;
  tag_text_color: string;
  tag_border_color: string;
  tag_background_color: string;
  country: string;
  city: string;
  price: number;
  currency_symbol: string;
};

export type GetDestinationWeekendResponse = Promise<DestinationWeekend[]>;
