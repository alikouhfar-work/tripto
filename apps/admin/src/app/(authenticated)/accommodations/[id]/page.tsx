import { AccommodationDetailView, getAccommodation } from '@/features/accommodation';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type AccommodationDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getAccommodationCached = cache(getAccommodation);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const accommodation = await getAccommodationCached(id);
    return { title: `${accommodation.title} — Details` };
  } catch {
    return { title: 'Accommodation details' };
  }
};

const AccommodationDetailPage = async ({
  params,
}: {
  params: Promise<AccommodationDetailPageParams>;
}) => {
  const { id } = await params;
  let accommodation;
  try {
    accommodation = await getAccommodationCached(id);
  } catch {
    notFound();
  }
  return <AccommodationDetailView accommodation={accommodation} />;
};

export default AccommodationDetailPage;
