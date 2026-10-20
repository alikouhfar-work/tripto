import { DestinationDetailView } from '@/features/destination';
import { getDestination } from '@/features/destination/server/queries';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type DestinationDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getDestinationCached = cache(getDestination);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<DestinationDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const destination = await getDestinationCached(id);
    return { title: `${destination.city} — Details` };
  } catch {
    return { title: 'Destination details' };
  }
};

const DestinationDetailPage = async ({
  params,
}: {
  params: Promise<DestinationDetailPageParams>;
}) => {
  const { id } = await params;
  let destination;
  try {
    destination = await getDestinationCached(id);
  } catch {
    notFound();
  }
  return <DestinationDetailView destination={destination} />;
};

export default DestinationDetailPage;
