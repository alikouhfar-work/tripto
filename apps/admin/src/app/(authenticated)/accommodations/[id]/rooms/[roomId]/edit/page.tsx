import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { RoomForm } from '@/features/accommodation/hotel/room/components/RoomForm';
import { getRoom } from '@/features/accommodation/hotel/room/server/queries';
import { getCurrenciesDropdown } from '@/features/currency/server/queries';
import { decodeFormState } from '@/server/form-state';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Room',
};

type AccommodationRoomsEditPageProps = {
  params: Promise<{ id: string; roomId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const AccommodationRoomsEditPage = async ({
  params,
  searchParams,
}: AccommodationRoomsEditPageProps) => {
  const [{ id: accommodationId, roomId }, query] = await Promise.all([params, searchParams]);
  const state = decodeFormState(query.form);

  // Kicked off before the room lookup so both queries run concurrently.
  const currencyOptionsPromise = getCurrenciesDropdown();

  let room;
  try {
    room = await getRoom(accommodationId, roomId);
  } catch {
    notFound();
  }

  const currencyOptions = await currencyOptionsPromise;

  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[
          { route: '/accommodations', title: 'Accommodations' },
          { route: `/accommodations/${accommodationId}`, title: 'Hotel' },
          { route: `/accommodations/${accommodationId}/rooms`, title: 'Rooms' },
        ]}
        className="mb-5"
        currentPageTitle="Edit Room"
      />

      <RoomForm
        accommodationId={accommodationId}
        roomId={room.id}
        initialData={{
          id: room.id,
          title: room.title,
          area: room.area,
          count: room.count,
          price: Number(room.price),
          currencyId: room.currencyId,
          discount: room.discount != null ? Number(room.discount) : null,
          capacity: room.capacity,
          bedrooms: room.bedrooms,
          bathrooms: room.bathrooms,
          amenities: (room.amenities ?? []) as { title: string; icon: string }[],
          beds: (room.beds ?? {}) as { king?: number; queen?: number; double?: number; single?: number },
        }}
        state={state}
        currencyOptions={currencyOptions}
      />
    </article>
  );
};

export default AccommodationRoomsEditPage;
