'use server';

import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireUserId } from '@/server/require-user';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { parseRoomFormData, type RoomFormData } from '@/features/accommodation/hotel/room/utils/parseRoomFormData';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@repo/documents/server';
import { createHash } from 'crypto';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_GALLERY_FILES = 20;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const isNonEmptyFile = (file: unknown): file is File =>
  file instanceof File && file.size > 0;

const isPositiveNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const isPositiveInt = (value: unknown): value is number =>
  isPositiveNumber(value) && Number.isInteger(value);

const isTitledList = (value: unknown): value is Array<{ title: string }> =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (item) =>
      !!item && typeof item === 'object' && typeof (item as { title?: unknown }).title === 'string',
  );

export const validateRoomInput = async (room: RoomFormData, index: number): Promise<string | null> => {
  const label = `Room #${index + 1}`;
  if (!room.title?.trim()) return `${label}: title is required`;
  if (!isPositiveNumber(room.area)) return `${label}: area must be positive`;
  if (!isPositiveInt(room.count)) return `${label}: count must be a positive whole number`;
  if (!isPositiveNumber(room.price)) return `${label}: price must be positive`;
  if (!room.currencyId?.trim()) return `${label}: currency is required`;
  if (!isPositiveInt(room.capacity))
    return `${label}: capacity must be a positive whole number`;
  if (!isPositiveInt(room.bathrooms))
    return `${label}: bathrooms count must be a positive whole number`;
  if (
    room.bedrooms != null &&
    (typeof room.bedrooms !== 'number' || !Number.isInteger(room.bedrooms) || room.bedrooms < 0)
  )
    return `${label}: bedrooms must be a non-negative whole number`;
  if (room.discount != null) {
    if (!Number.isFinite(room.discount) || room.discount <= 0)
      return `${label}: discount must be a positive number`;
    if (room.discount > 100) return `${label}: discount cannot exceed 100%`;
  }
  if (!isTitledList(room.amenities)) return `${label}: amenities are invalid`;
  if (room.beds) {
    const bad = Object.values(room.beds).some(
      (v) => typeof v !== 'number' || !Number.isInteger(v) || v < 0,
    );
    if (bad) return `${label}: beds must be non-negative whole numbers`;
  }
  if (room.currencyId?.trim()) {
    const currency = await prisma.currency.findUnique({ where: { id: room.currencyId } });
    if (!currency) return `${label}: selected currency no longer exists`;
  }
  return null;
};

const MAX_GALLERY_FILES_PER_ROOM = 20;

const formDataToValues = (formData: FormData): Record<string, string | string[]> => {
  const values: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        (values[key] as string[]).push(value.toString());
      } else {
        values[key] = [values[key].toString(), value.toString()];
      }
    } else {
      values[key] = value.toString();
    }
  }
  return values;
};

const redirectWithFormState = (path: string, state: {
  errors?: Record<string, string>;
  values?: Record<string, string | string[]>;
  message?: string;
  success?: boolean;
}): never => {
  const separator = path.includes('?') ? '&' : '?';
  const encoded = Buffer.from(
    JSON.stringify({
      errors: state.errors,
      values: state.values,
      message: state.message,
      success: state.success,
    }),
  ).toString('base64url');
  redirect(`${path}${separator}form=${encoded}`);
};

export const createRoomAction = async (accommodationId: string, formData: FormData) => {
  const userId = await requireUserId();
  const roomData = parseRoomFormData(formData);

  const errors: Record<string, string> = {};

  const roomValidationError = await validateRoomInput(roomData, 0);
  if (roomValidationError) errors.general = roomValidationError;

  if (Object.keys(errors).length > 0) {
    revalidatePath(`/accommodations/${accommodationId}/rooms/new`);
    redirectWithFormState(`/accommodations/${accommodationId}/rooms/new?form`, {
      errors,
      values: formDataToValues(formData),
    });
  }

  const currency = await prisma.currency.findUnique({
    where: { id: roomData.currencyId },
  });
  if (!currency) {
    errors.general = 'Selected currency no longer exists';
    revalidatePath(`/accommodations/${accommodationId}/rooms/new`);
    redirectWithFormState(`/accommodations/${accommodationId}/rooms/new?form`, {
      errors,
      values: formDataToValues(formData),
    });
  }

  const accommodation = await prisma.accommodation.findUnique({
    where: { id: accommodationId },
    include: { hotel: true },
  });
  if (!accommodation?.hotel) {
    errors.general = 'Hotel not found';
    revalidatePath('/accommodations');
    redirect('/accommodations');
  }

  const room = await prisma.$transaction(async (tx) => {
    return tx.room.create({
      data: {
        title: roomData.title,
        area: roomData.area,
        count: roomData.count,
        price: roomData.price,
        currencyId: roomData.currencyId,
        discount: roomData.discount ?? null,
        capacity: roomData.capacity,
        bedrooms: roomData.bedrooms ?? null,
        bathrooms: roomData.bathrooms,
        amenities: roomData.amenities as any,
        beds: roomData.beds ?? {},
        hotelId: accommodation!.hotel!.id,
        createdById: userId,
      },
    });
  });

  // Upload room gallery images
  const galleryFiles = formData.getAll('galleryImages') as File[];
  const pickedFiles = galleryFiles.filter(isNonEmptyFile);

  if (pickedFiles.length > 0) {
    if (pickedFiles.length > MAX_GALLERY_FILES_PER_ROOM) {
      // Handle error - too many files
    } else {
      const validFiles = pickedFiles.filter(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE,
      );

      const uploadPromises = validFiles.map(async (file, index) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const hash = createHash('sha256').update(buffer).digest('hex');

        const object = `${accommodationId}/rooms/${room.id}/gallery/${hash}.webp`;
        const result = await uploadDocument({ file, bucket: 'accommodations', object });
        return result;
      });

      const results = await Promise.allSettled(uploadPromises);
      if (results.some((r) => r.status === 'rejected')) {
        // Handle gallery upload failure - could compensate by deleting the room
      }
    }
  }

  revalidatePath(`/accommodations/${accommodationId}/rooms`);
  return redirect(`/accommodations/${accommodationId}/rooms`);
};

export const updateRoomAction = async (
  accommodationId: string,
  roomId: string,
  formData: FormData,
) => {
  const userId = await requireUserId();
  const roomData = parseRoomFormData(formData);

  const errors: Record<string, string> = {};

  const roomValidationError = await validateRoomInput(roomData, 0);
  if (roomValidationError) errors.general = roomValidationError;

  if (Object.keys(errors).length > 0) {
    revalidatePath(`/accommodations/${accommodationId}/rooms/${roomId}/edit`);
    redirectWithFormState(`/accommodations/${accommodationId}/rooms/${roomId}/edit?form`, {
      errors,
      values: formDataToValues(formData),
    });
  }

  const currency = await prisma.currency.findUnique({
    where: { id: roomData.currencyId },
  });
  if (!currency) {
    errors.general = 'Selected currency no longer exists';
    revalidatePath(`/accommodations/${accommodationId}/rooms/${roomId}/edit`);
    redirectWithFormState(`/accommodations/${accommodationId}/rooms/${roomId}/edit?form`, {
      errors,
      values: formDataToValues(formData),
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.room.update({
      where: { id: roomId },
      data: {
        title: roomData.title,
        area: roomData.area,
        count: roomData.count,
        price: roomData.price,
        currencyId: roomData.currencyId,
        discount: roomData.discount ?? null,
        capacity: roomData.capacity,
        bedrooms: roomData.bedrooms ?? null,
        bathrooms: roomData.bathrooms,
        amenities: roomData.amenities as any,
        beds: roomData.beds ?? {},
        updatedAt: new Date(),
        updatedById: userId,
      },
    });
  });

  // Update room gallery images
  const deletedIndices = formData.getAll('deletedGalleryIndices') as string[];
  for (const idx of deletedIndices) {
    const key = `${accommodationId}/rooms/${roomId}/gallery/${idx}.webp`;
    await deleteDocument({ bucket: 'accommodations', object: key });
  }

  // Upload new gallery images
  const newGalleryFiles = formData.getAll('newGalleryImages') as File[];
  const pickedFiles = newGalleryFiles.filter(isNonEmptyFile);
  if (pickedFiles.length > 0) {
    if (pickedFiles.length > MAX_GALLERY_FILES_PER_ROOM) {
      // Handle error
    } else {
      const validFiles = pickedFiles.filter(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE,
      );

      const uploadPromises = validFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const hash = createHash('sha256').update(buffer).digest('hex');

        const object = `${accommodationId}/rooms/${roomId}/gallery/${hash}.webp`;
        const result = await uploadDocument({ file, bucket: 'accommodations', object });
        return result;
      });

      const results = await Promise.allSettled(uploadPromises);
      if (results.some((r) => r.status === 'rejected')) {
        // Handle gallery upload failure
      }
    }
  }

  revalidatePath(`/accommodations/${accommodationId}/rooms`);
  return redirect(`/accommodations/${accommodationId}/rooms`);
};

export const deleteRoomAction = async (accommodationId: string, roomId: string) => {
  const userId = await requireUserId();

  // Check if this is the last room for the hotel
  const roomCount = await prisma.room.count({
    where: { hotel: { accommodationId } },
  });

  if (roomCount <= 1) {
    // Instead of blocking, show a warning and allow the user to proceed
    // but mark the hotel as needing rooms
    await prisma.room.delete({
      where: { id: roomId },
    });

    // Delete room gallery images
    const keys = await listKeysByPrefix({
      prefix: `${accommodationId}/rooms/${roomId}/gallery/`,
      bucket: 'accommodations',
    }).catch(() => [] as string[]);
    await Promise.allSettled(
      keys.map((key) => deleteDocument({ bucket: 'accommodations', object: key })),
    );

    revalidatePath(`/accommodations/${accommodationId}/rooms`);
    return redirect(`/accommodations/${accommodationId}/rooms`);
  }

  // Delete room if it's not the last one
  await prisma.room.delete({
    where: { id: roomId },
  });

  // Delete room gallery images
  const keys = await listKeysByPrefix({
    prefix: `${accommodationId}/rooms/${roomId}/gallery/`,
    bucket: 'accommodations',
  }).catch(() => [] as string[]);
  await Promise.allSettled(
    keys.map((key) => deleteDocument({ bucket: 'accommodations', object: key })),
  );

  revalidatePath(`/accommodations/${accommodationId}/rooms`);
  return redirect(`/accommodations/${accommodationId}/rooms`);
};