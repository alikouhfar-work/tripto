export type DestinationSeasonal = {
  accommodationId: string;
  price: number;
  city: string;
  destinationSlogan: string;
  country: string;
  currencySymbol: string;
};

export type RawDestinationSeasonalResult = {
  accommodation_id: number;
  country: string;
  city: string;
  price: number;
  currency_symbol: string;
  destination_slogan: string;
};

export type GetDestinationSeasonalResponse = Promise<DestinationSeasonal[]>;