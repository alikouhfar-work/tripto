import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { RoomsManager } from '@/features/accommodation/hotel/room/components/RoomsManager';
import { getRoomsByHotel } from '@/features/accommodation/hotel/room/server/queries';
import type { Room } from '@/features/accommodation/hotel/types/room';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel Rooms',
};

type AccommodationRoomsPageProps = {
  params: Promise<{ id: string }>;
};

const AccommodationRoomsPage = async ({ params }: AccommodationRoomsPageProps) => {
  const { id: accommodationId } = await params;

  // Rooms are fetched here (Server Component) and passed down to the
  // server-side RoomsManager — no client-side fetching.
  const roomsData = await getRoomsByHotel(accommodationId);
  const rooms: Room[] = roomsData.map((room) => ({
    ...room,
    beds: room.beds as unknown as Room['beds'],
    amenities: room.amenities as unknown as Room['amenities'],
  }));

  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[
          { route: '/accommodations', title: 'Accommodations' },
          { route: `/accommodations/${accommodationId}`, title: 'Hotel' },
        ]}
        className="mb-5"
        currentPageTitle="Rooms"
      />

      {rooms.length === 0 && (
        <div className="mb-6 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <p className="text-sm font-medium text-foreground">This hotel has no rooms yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            At least one room is required for a hotel.
          </p>
        </div>
      )}

      <RoomsManager accommodationId={accommodationId} rooms={rooms} />
    </article>
  );
};

export default AccommodationRoomsPage;
