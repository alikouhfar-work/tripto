import { Accommodations, AccommodationsPageProps } from '@/features/accommodation';
import { getAccommodations } from '@/features/accommodation/server/queries';
import { FC } from 'react';

const AccommodationsPage: FC<AccommodationsPageProps> = async ({ searchParams }) => {
  const { skip, take } = await searchParams;
  const { city, totalPages, totalCount, accommodations } = await getAccommodations({
    skip: Number(skip) || 0,
    take: Number(take) || 9,
  });

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-20 pt-28 sm:px-6 lg:px-8">
      <Accommodations
        city={city}
        totalPages={totalPages}
        totalCount={totalCount}
        accommodations={accommodations}
      />
    </main>
  );
};

export default AccommodationsPage;
