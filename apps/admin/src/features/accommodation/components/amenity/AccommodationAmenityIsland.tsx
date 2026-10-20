'use client';

import { useState } from 'react';
import { AccommodationAmenity } from '@/features/accommodation/components/amenity/AccommodationAmenity';
import type { AccommodationAmenity as AccommodationAmenityType } from '@/features/accommodation/types/accommodationAmenity';

type AccommodationAmenityIslandProps = {
  error?: string;
  initial?: Array<AccommodationAmenityType>;
  defaults?: Array<AccommodationAmenityType>;
};

export const AccommodationAmenityIsland = ({
  error,
  initial,
  defaults,
}: AccommodationAmenityIslandProps) => {
  const [items, setItems] = useState<Array<AccommodationAmenityType>>(
    defaults ?? initial ?? [],
  );

  return (
    <>
      <input type="hidden" name="amenitiesJson" value={JSON.stringify(items)} />
      <AccommodationAmenity
        fields={items}
        error={error}
        onAppend={(value) => setItems((prev) => [...prev, value])}
        onRemove={(index) => setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index))}
        onUpdate={(index, value) =>
          setItems((prev) => prev.map((item, itemIndex) => (itemIndex === index ? value : item)))
        }
      />
    </>
  );
};
