'use client';

import { useState } from 'react';
import { SeasonalPrice } from '@/features/accommodation/house/components/seasonal-price/SeasonalPrice';
import type { SeasonalPrice as SeasonalPriceType } from '@/features/accommodation/house/types/seasonalPrice';

type SeasonalPriceIslandProps = {
  error?: string;
  currencySymbol?: string;
  initial?: Array<SeasonalPriceType>;
  defaults?: Array<SeasonalPriceType>;
};

export const SeasonalPriceIsland = ({
  error,
  currencySymbol,
  initial,
  defaults,
}: SeasonalPriceIslandProps) => {
  const [items, setItems] = useState<Array<SeasonalPriceType>>(defaults ?? initial ?? []);

  return (
    <>
      <input type="hidden" name="availableDatesJson" value={JSON.stringify(items)} />
      <SeasonalPrice
        fields={items}
        error={error}
        currencySymbol={currencySymbol ?? ''}
        onAppend={(value) => setItems((prev) => [...prev, value])}
        onRemove={(index) => setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index))}
        onUpdate={(index, value) =>
          setItems((prev) => prev.map((item, itemIndex) => (itemIndex === index ? value : item)))
        }
      />
    </>
  );
};
