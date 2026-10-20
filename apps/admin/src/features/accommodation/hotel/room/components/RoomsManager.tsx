import { AccommodationRoomItem } from '@/features/accommodation/hotel/components/room/AccommodationRoomItem';
import type { Room } from '@/features/accommodation/hotel/types/room';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

type RoomsManagerProps = {
  accommodationId: string;
  /** Rooms fetched by the parent Server Component. */
  rooms: Room[];
};

/**
 * Server-side rooms grid. Data fetching lives in the page; this component
 * only renders room cards plus a dashed "Add Room" tile.
 */
export const RoomsManager = ({ accommodationId, rooms }: RoomsManagerProps) => {
  const isLastRoom = rooms.length <= 1;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {rooms.map((room) => (
        <AccommodationRoomItem
          key={room.id}
          item={room}
          accommodationId={accommodationId}
          isLastRoom={isLastRoom}
        />
      ))}

      <Link
        href={`/accommodations/${accommodationId}/rooms/new`}
        aria-label="Add room"
        className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border p-6 text-center text-muted-foreground transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
      >
        <span className="flex size-11 items-center justify-center rounded-full border border-dashed border-current">
          <IconPlus size={20} />
        </span>
        <span className="text-sm font-semibold">Add Room</span>
        <span className="text-xs">Create a new room for this hotel</span>
      </Link>
    </div>
  );
};
