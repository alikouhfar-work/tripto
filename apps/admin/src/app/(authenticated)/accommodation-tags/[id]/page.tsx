import { AccommodationTagDetailView } from '@/features/accommodation-tag';
import { getAccommodationTag } from '@/features/accommodation-tag/server/queries';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type AccommodationTagDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getAccommodationTagCached = cache(getAccommodationTag);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationTagDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const tag = await getAccommodationTagCached(id);
    return { title: `${tag.title} — Details` };
  } catch {
    return { title: 'Accommodation tag details' };
  }
};

const AccommodationTagDetailPage = async ({
  params,
}: {
  params: Promise<AccommodationTagDetailPageParams>;
}) => {
  const { id } = await params;
  let tag;
  try {
    tag = await getAccommodationTagCached(id);
  } catch {
    notFound();
  }
  return <AccommodationTagDetailView tag={tag} />;
};

export default AccommodationTagDetailPage;
