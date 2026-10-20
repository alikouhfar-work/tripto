'use client';

import { useEffect, useRef, useState } from 'react';
import { AccommodationRoom } from '@/features/accommodation/hotel/components/room/AccommodationRoom';
import type { Room, RoomOption } from '@/features/accommodation/hotel/types/room';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'].join(',');

type AccommodationRoomsIslandProps = {
  error?: string;
  accommodationId?: string;
  initialRooms?: Array<Room>;
  defaults?: Array<Room>;
  currencyOptions?: Array<RoomOption>;
};

export const AccommodationRoomsIsland = ({
  error,
  initialRooms,
  defaults,
  accommodationId,
  currencyOptions,
}: AccommodationRoomsIslandProps) => {
  const source = defaults ?? initialRooms;
  const [rooms, setRooms] = useState<Array<Room>>(source ?? []);
  const [roomsFiles, setRoomsFiles] = useState<Array<File[]>>(() =>
    (source ?? []).map((room) => room.galleryImages ?? []),
  );

  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    roomsFiles.forEach((files, index) => {
      const input = fileInputRefs.current[index];
      if (!input) return;
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      input.files = dataTransfer.files;
    });
  });

  const appendRoom = (room: Room) => {
    setRooms((prev) => [...prev, { ...room, beds: room.beds ?? {} }]);
    setRoomsFiles((prev) => [...prev, room.galleryImages ?? []]);
  };

  const updateRoom = (index: number, room: Room) => {
    setRooms((prev) => prev.map((item, itemIndex) => (itemIndex === index ? room : item)));
    setRoomsFiles((prev) =>
      prev.map((files, fileIndex) => (fileIndex === index ? (room.galleryImages ?? []) : files)),
    );
  };

  const removeRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setRoomsFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index));
  };

  const roomsJson = JSON.stringify(
    rooms.map(({ galleryImages: _galleryImages, ...rest }) => rest),
  );

  return (
    <>
      <input type="hidden" name="roomsJson" value={roomsJson} />
      {roomsFiles.map((_, index) => (
        <input
          // eslint-disable-next-line react/no-array-index-key
          key={`room-gallery-${index}`}
          ref={(element) => {
            fileInputRefs.current[index] = element;
          }}
          multiple
          type="file"
          accept={ALLOWED_TYPES}
          name={`roomsGalleryImages_${index}`}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          onChange={() => undefined}
        />
      ))}
      <AccommodationRoom
        fields={rooms}
        error={error}
        accommodationId={accommodationId}
        currencyOptions={currencyOptions}
        onAppend={appendRoom}
        onRemove={removeRoom}
        onUpdate={updateRoom}
      />
    </>
  );
};
