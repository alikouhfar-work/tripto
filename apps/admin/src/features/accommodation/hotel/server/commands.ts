'use server';

import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createHash } from 'crypto';
import { requireUserId } from '@/server/require-user';
import {
  actionErrorMessage,
  formDataToValues,
  redirectWithFormState,
} from '@/server/form-state';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { parseHotelFormData } from '@/features/accommodation/hotel/utils/parseHotelFormData';
import { validateHotelFiles } from '@/features/accommodation/hotel/utils/validateFiles';
import type { HotelFormData } from '@/features/accommodation/hotel/types/hotelForm';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@repo/documents/server';
import { extractHash } from '@/utils/extractHash';


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

export const validateHotelInput = async (
  data: HotelFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.title?.trim()) errors.title = 'Title is required';
  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length > 3000) {
    errors.description = 'Description cannot be more than 3000 characters';
  }
  if (!data.tagId?.trim()) errors.tagId = 'Tag is required';

  if (!data.country?.trim()) errors.country = 'Country is required';
  if (!data.countryCode?.trim()) errors.countryCode = 'Country code is required';
  if (!data.city?.trim()) errors.city = 'City is required';
  if (!data.fullAddress?.trim()) errors.fullAddress = 'Full address is required';
  if (typeof data.latitude !== 'number' || !Number.isFinite(data.latitude)) {
    errors.latitude = 'Latitude is required';
  } else if (data.latitude < -90 || data.latitude > 90) {
    errors.latitude = 'Latitude must be between -90 and 90';
  }
  if (typeof data.longitude !== 'number' || !Number.isFinite(data.longitude)) {
    errors.longitude = 'Longitude is required';
  } else if (data.longitude < -180 || data.longitude > 180) {
    errors.longitude = 'Longitude must be between -180 and 180';
  }

  if (!isTitledList(data.amenities)) errors.amenities = 'Amenities are invalid';
  if (!isTitledList(data.policies)) errors.policies = 'Policies are invalid';

  if (data.tagId?.trim()) {
    const tag = await prisma.accommodationTag.findUnique({ where: { id: data.tagId } });
    if (!tag) errors.tagId = 'Selected tag no longer exists';
  }

  return errors;
};

export const createHotel = async (formData: FormData) => {
  const userId = await requireUserId();
  const { data, heroImage, galleryImages } = parseHotelFormData(formData);

  const errors = await validateHotelInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_ERRORS.CREATE_FAILED);
  }

  const normalizedHero = isNonEmptyFile(heroImage) ? heroImage : undefined;
  const normalizedGallery = (galleryImages ?? []).filter(isNonEmptyFile);

  const accommodation = await prisma.$transaction(async (tx) => {
    const existing = await tx.accommodation.findUnique({
      where: {
        title_countryCode_city_fullAddress: {
          title: data.title,
          countryCode: data.countryCode,
          city: data.city,
          fullAddress: data.fullAddress,
        },
      },
    });
    if (existing) throw new Error(ACCOMMODATION_ERRORS.DUPLICATE);

    return tx.accommodation.create({
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        fullAddress: data.fullAddress,
        latitude: data.latitude,
        longitude: data.longitude,
        createdBy: { connect: { id: userId } },
        tag: { connect: { id: data.tagId } },
        hotel: {
          create: {},
        },
      },
      include: {
        hotel: { include: { rooms: true } },
      },
    });
  });

  if (normalizedHero) {
    try {
      const result = await uploadDocument({
        file: normalizedHero,
        bucket: 'accommodations',
        object: `${accommodation.id}/hero.webp`,
      });
      if (!result.success) throw new Error(ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED);
    } catch (error) {
      // Compensate: don't leave an imageless row behind on upload failure.
      await prisma.accommodation.delete({ where: { id: accommodation.id } }).catch(() => undefined);
      throw error instanceof Error ? error : new Error(ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED);
    }
  }

  const uploadedGalleryKeys: string[] = [];
  try {
    if (normalizedGallery.length) {
      const results = await Promise.allSettled(
        normalizedGallery.map(async (file) => {
          const hash = await hashFile(file);
          const object = `${accommodation.id}/gallery/${hash}.webp`;
          const result = await uploadDocument({ file, bucket: 'accommodations', object });
          if (!result.success) throw new Error(ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED);
          uploadedGalleryKeys.push(object);
        }),
      );
      if (results.some((r) => r.status === 'rejected'))
        throw new Error(ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED);
    }
  } catch (error) {
    // Compensate: remove the row and anything already uploaded.
    await Promise.allSettled([
      ...uploadedGalleryKeys.map((key) => deleteDocument({ object: key, bucket: 'accommodations' })),
      deleteDocument({ bucket: 'accommodations', object: `${accommodation.id}/hero.webp` }),
      prisma.accommodation.delete({ where: { id: accommodation.id } }),
    ]);
    throw error instanceof Error
      ? error
      : new Error(ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED);
  }

  revalidatePath('/accommodations');
  return accommodation;
};

export const updateHotel = async (id: string, formData: FormData) => {
  const userId = await requireUserId();
  const { data, heroImage, galleryImages } = parseHotelFormData(formData);

  const errors = await validateHotelInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  const normalizedHero = isNonEmptyFile(heroImage) ? heroImage : undefined;
  const normalizedGallery = (galleryImages ?? []).filter(isNonEmptyFile);

  const existing = await prisma.accommodation.findUnique({
    where: { id },
    include: {
      hotel: { include: { rooms: true } },
    },
  });
  if (!existing?.hotel) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  const accommodation = await prisma.$transaction(async (tx) => {
    return tx.accommodation.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        fullAddress: data.fullAddress,
        latitude: data.latitude,
        longitude: data.longitude,
        updatedAt: new Date(),
        updatedBy: { connect: { id: userId } },
        tag: { connect: { id: data.tagId } },
      },
      include: {
        hotel: { include: { rooms: true } },
      },
    });
  });

  if (normalizedHero) {
    try {
      const result = await uploadDocument({
        file: normalizedHero,
        bucket: 'accommodations',
        object: `${id}/hero.webp`,
      });
      if (!result.success) throw new Error(ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED);
    } catch (error) {
      throw error instanceof Error ? error : new Error(ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED);
    }
  }

  if (normalizedGallery.length) {
    const prefix = `${id}/gallery/`;
    const existingKeys = await listKeysByPrefix({ prefix, bucket: 'accommodations' });
    const existingHashes = new Set(existingKeys.map(extractHash));

    const incoming = await Promise.all(
      normalizedGallery.map(async (file) => ({ file, hash: await hashFile(file) })),
    );

    const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));

    const uploadResults = await Promise.allSettled(
      toUpload.map(({ file, hash }) =>
        uploadDocument({ bucket: 'accommodations', object: `${prefix}${hash}.webp`, file }),
      ),
    );
    if (uploadResults.some((r) => r.status === 'rejected'))
      throw new Error(ACCOMMODATION_ERRORS.UPDATE_SOME_GALLERY_FAILED);
  }

  revalidatePath('/accommodations');
  return accommodation;
};

export const createHotelAction = async (formData: FormData): Promise<never> => {
  const backPath = '/accommodations/new?type=hotel';
  const { data, heroImage, galleryImages } = parseHotelFormData(formData);

  const errors = {
    ...(await validateHotelInput(data)),
    ...validateHotelFiles(heroImage, galleryImages),
  };
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await createHotel(formData);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACCOMMODATION_ERRORS),
      ACCOMMODATION_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === ACCOMMODATION_ERRORS.DUPLICATE ? { ...errors, title: message } : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/accommodations');
  redirect('/accommodations');
};

export const updateHotelAction = async (id: string, formData: FormData): Promise<never> => {
  const backPath = `/accommodations/${id}/edit`;
  const { data, heroImage, galleryImages } = parseHotelFormData(formData);

  const errors = {
    ...(await validateHotelInput(data)),
    ...validateHotelFiles(heroImage, galleryImages),
  };
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateHotel(id, formData);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACCOMMODATION_ERRORS),
      ACCOMMODATION_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === ACCOMMODATION_ERRORS.DUPLICATE ? { ...errors, title: message } : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

/** Hash a file for gallery deduplication. */
const hashFile = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return createHash('sha256').update(buffer).digest('hex');
};