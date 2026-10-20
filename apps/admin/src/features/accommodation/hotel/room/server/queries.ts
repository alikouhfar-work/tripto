'use server';

import { prisma } from '@repo/database';
import type { RoomSchema } from '@/features/accommodation/hotel/room/schema/room';
import type { RoomDetails } from '@/features/accommodation/hotel/room/types/roomForm';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

export const getRoomsByHotel = async (accommodationId: string) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { hotel: { accommodationId } },
      include: {
        currency: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return rooms;
  } catch {
    throw new Error(ACCOMMODATION_ERRORS.GET_LIST_FAILED);
  }
};

export const getRoom = async (accommodationId: string, roomId: string) => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        hotel: { accommodationId },
      },
      include: {
        currency: true,
      },
    });
    if (!room) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

    return room;
  } catch (error) {
    if (error instanceof Error && error.message === ACCOMMODATION_ERRORS.NOT_FOUND) throw error;
    throw new Error(ACCOMMODATION_ERRORS.GET_FAILED);
  }
};

export const getHotelRoomCount = async (accommodationId: string) => {
  try {
    const count = await prisma.room.count({
      where: { hotel: { accommodationId } },
    });
    return count;
  } catch {
    return 0;
  }
};

export const getHotelsWithoutRooms = async () => {
  try {
    const accommodations = await prisma.accommodation.findMany({
      where: { hotel: {} },
      select: { id: true, title: true },
    });
    return accommodations;
  } catch {
    return [];
  }
};