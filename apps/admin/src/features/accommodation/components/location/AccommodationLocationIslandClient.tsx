'use client';

import dynamic from 'next/dynamic';
import { AccommodationLocationSkeleton } from '@/features/accommodation/components/location/AccommodationLocationSkeleton';

const AccommodationLocationIsland = dynamic(
  () =>
    import('@/features/accommodation/components/location/AccommodationLocationIsland').then(
      (module) => module.AccommodationLocationIsland,
    ),
  {
    ssr: false,
    loading: () => <AccommodationLocationSkeleton />,
  },
);

export { AccommodationLocationIsland };