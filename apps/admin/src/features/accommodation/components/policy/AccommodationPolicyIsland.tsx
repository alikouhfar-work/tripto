'use client';

import { useState } from 'react';
import { AccommodationPolicy } from '@/features/accommodation/components/policy/AccommodationPolicy';
import type { AccommodationPolicy as AccommodationPolicyType } from '@/features/accommodation/types/accommodationPolicy';

type AccommodationPolicyIslandProps = {
  error?: string;
  initial?: Array<AccommodationPolicyType>;
  defaults?: Array<AccommodationPolicyType>;
};

export const AccommodationPolicyIsland = ({
  error,
  initial,
  defaults,
}: AccommodationPolicyIslandProps) => {
  const [items, setItems] = useState<Array<AccommodationPolicyType>>(
    defaults ?? initial ?? [],
  );

  return (
    <>
      <input type="hidden" name="policiesJson" value={JSON.stringify(items)} />
      <AccommodationPolicy
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
