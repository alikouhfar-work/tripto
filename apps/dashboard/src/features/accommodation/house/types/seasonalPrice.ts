export interface SeasonalPrice {
  date: string;
  price: number;
}

export interface SeasonalPriceProps {
  currencyId: string;
  fields: Array<SeasonalPrice>;
  onRemove: (index: number) => void;
  onAppend: (value: SeasonalPrice) => void;
  onUpdate: (index: number, val: SeasonalPrice) => void;
}

export interface SeasonalPriceItemProps {
  item: SeasonalPrice;
  onEdit: () => void;
  onRemove: () => void;
  currencySymbol?: string;
}

export interface SeasonalPriceFormProps {
  currencySymbol?: string;
  closeHandler: () => void;
  fields: Array<SeasonalPrice>;
  currentItem: SelectedSeasonalPrice;
  createHandler: (seasonalPrice: SeasonalPrice) => void;
  updateHandler: (index: number, seasonalPrice: SeasonalPrice) => void;
}

export type SelectedSeasonalPrice = {
  seasonalPrice: SeasonalPrice | null;
  index?: number;
};
