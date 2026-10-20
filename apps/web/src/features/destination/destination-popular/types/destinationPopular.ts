export type DestinationPopular = {
  accommodationId: string;
  accommodationTitle: string;
  price: number;
  city: string;
  country: string;
  currencySymbol: string;
};

export type RawDestinationPopularResult = {
  accommodation_id: number;
  accommodation_title: number;
  country: string;
  city: string;
  price: number;
  currency_symbol: string;
};

export type GetDestinationPopularResponse = Promise<DestinationPopular[]>;
