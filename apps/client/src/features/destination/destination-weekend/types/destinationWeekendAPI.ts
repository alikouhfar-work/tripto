import { DestinationWeekend } from '@/features/destination/destination-weekend/types/destinationWeekend';

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
