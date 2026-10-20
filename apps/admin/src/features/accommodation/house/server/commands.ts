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
import { parseHouseFormData } from '@/features/accommodation/house/utils/parseHouseFormData';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@repo/documents/server';
import { extractHash } from '@/utils/extractHash';

type ParsedHouseFormData = ReturnType<typeof parseHouseFormData>;

const isNonEmptyFile = (file: unknown): file is File =>
  file instanceof File && file.size > 0;

const isPositiveNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const isPositiveInt = (value: unknown): value is number =>
  isPositiveNumber(value) && Number.isInteger(value);

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_GALLERY_FILES = 20;

const isTitledList = (value: unknown): value is Array<{ title: string }> =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every(
    (item) =>
      !!item && typeof item === 'object' && typeof (item as { title?: unknown }).title === 'string',
  );

export const validateHouseInput = async (
  data: ParsedHouseFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.title?.trim()) errors.title = 'Title is required';
  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.length > 3000) {
    errors.description = 'Description cannot be more than 3000 characters';
  }
  if (!data.tagId?.trim()) errors.tagId = 'Tag is required';

  if (!isPositiveInt(data.capacity)) errors.capacity = 'Capacity must be a positive whole number';
  if (!isPositiveNumber(data.area)) errors.area = 'Area must be positive';
  if (!isPositiveInt(data.floors)) errors.floors = 'Floors count must be a positive whole number';
  if (!isPositiveInt(data.bedrooms))
    errors.bedrooms = 'Bedrooms count must be a positive whole number';
  if (!isPositiveInt(data.bathrooms))
    errors.bathrooms = 'Bathrooms count must be a positive whole number';

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

  if (!isPositiveNumber(data.price)) errors.price = 'Price must be positive';
  if (!data.currencyId?.trim()) errors.currencyId = 'Currency is required';
  if (data.discount != null) {
    if (!Number.isFinite(data.discount) || data.discount <= 0) {
      errors.discount = 'Discount must be a positive number';
    } else if (data.discount > 100) {
      errors.discount = 'Discount cannot exceed 100%';
    }
  }

  if (!isTitledList(data.amenities)) errors.amenities = 'Amenities are invalid';
  if (!isTitledList(data.policies)) errors.policies = 'Policies are invalid';

  if (data.tagId?.trim()) {
    const tag = await prisma.accommodationTag.findUnique({ where: { id: data.tagId } });
    if (!tag) errors.tagId = 'Selected tag no longer exists';
  }
  if (data.currencyId?.trim()) {
    const currency = await prisma.currency.findUnique({ where: { id: data.currencyId } });
    if (!currency) errors.currencyId = 'Selected currency no longer exists';
  }

  if (isNonEmptyFile(data.heroImage)) {
    if (!ALLOWED_IMAGE_TYPES.includes(data.heroImage.type)) {
      errors.heroImage = 'Only PNG, JPG, WEBP or AVIF files are allowed';
    } else if (data.heroImage.size > MAX_IMAGE_SIZE) {
      errors.heroImage = 'Each file size must be under 5MB';
    }
  }
  const gallery = (data.galleryImages ?? []).filter(isNonEmptyFile);
  if (gallery.length > MAX_GALLERY_FILES) {
    errors.galleryImages = `At most ${MAX_GALLERY_FILES} gallery images are allowed`;
  } else {
    const badFile = gallery.find(
      (file) => !ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE,
    );
    if (badFile) errors.galleryImages = 'Gallery images must be PNG, JPG, WEBP or AVIF under 5MB';
  }

  return errors;
};

export const createHouse = async (formData: FormData) => {
  const userId = await requireUserId();
  const raw = parseHouseFormData(formData);

  const errors = await validateHouseInput(raw);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_ERRORS.CREATE_FAILED);
  }

  const normalizedHero = isNonEmptyFile(raw.heroImage) ? raw.heroImage : undefined;
  const normalizedGallery = (raw.galleryImages ?? []).filter(isNonEmptyFile);

  const accommodation = await prisma.$transaction(async (tx) => {
    const existing = await tx.accommodation.findUnique({
      where: {
        title_countryCode_city_fullAddress: {
          title: raw.title,
          countryCode: raw.countryCode,
          city: raw.city,
          fullAddress: raw.fullAddress,
        },
      },
    });
    if (existing) throw new Error(ACCOMMODATION_ERRORS.DUPLICATE);

    return tx.accommodation.create({
      data: {
        title: raw.title,
        description: raw.description,
        policies: raw.policies,
        amenities: raw.amenities,
        country: raw.country,
        countryCode: raw.countryCode,
        city: raw.city,
        fullAddress: raw.fullAddress,
        latitude: raw.latitude as number,
        longitude: raw.longitude as number,
        tag: { connect: { id: raw.tagId } },
        createdBy: { connect: { id: userId } },
        house: {
          create: {
            price: raw.price as number,
            discount: raw.discount ?? null,
            capacity: raw.capacity as number,
            area: raw.area as number,
            floors: raw.floors as number,
            bedrooms: raw.bedrooms as number,
            bathrooms: raw.bathrooms as number,
            currencyId: raw.currencyId,
            createdById: userId,
            availableDates: raw.availableDates,
          },
        },
      },
      include: { house: true },
    });
  });

  if (normalizedHero) {
    try {
      const uploadResult = await uploadDocument({
        file: normalizedHero,
        bucket: 'accommodations',
        object: `${accommodation.id}/hero.webp`,
      });
      if (!uploadResult.success) throw new Error(ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED);
    } catch (error) {
      // Compensate: don't leave an imageless row behind on upload failure.
      await prisma.accommodation.delete({ where: { id: accommodation.id } }).catch(() => undefined);
      throw error instanceof Error ? error : new Error(ACCOMMODATION_ERRORS.CREATE_IMAGE_FAILED);
    }
  }

  if (normalizedGallery.length > 0) {
    const results = await Promise.allSettled(
      normalizedGallery.map(async (file: File) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const hash = createHash('sha256').update(buffer).digest('hex');
        return uploadDocument({
          file,
          bucket: 'accommodations',
          object: `${accommodation.id}/gallery/${hash}.webp`,
        });
      }),
    );

    const failed = results.some((r) => r.status === 'rejected');
    if (failed) {
      // Compensate: remove the row (and any uploaded gallery files) so a
      // half-gallery state never persists.
      const prefix = `${accommodation.id}/gallery/`;
      const uploaded = await listKeysByPrefix({ prefix, bucket: 'accommodations' }).catch(
        () => [] as string[],
      );
      await Promise.allSettled([
        ...uploaded.map((key) => deleteDocument({ object: key, bucket: 'accommodations' })),
        deleteDocument({ bucket: 'accommodations', object: `${accommodation.id}/hero.webp` }),
        prisma.accommodation.delete({ where: { id: accommodation.id } }),
      ]);
      throw new Error(ACCOMMODATION_ERRORS.CREATE_SOME_GALLERY_FAILED);
    }
  }

  revalidatePath('/accommodations');
  return accommodation;
};

export const updateHouse = async (id: string, formData: FormData) => {
  const userId = await requireUserId();
  const raw = parseHouseFormData(formData);

  const errors = await validateHouseInput(raw);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  const normalizedHero = isNonEmptyFile(raw.heroImage) ? raw.heroImage : undefined;
  const normalizedGallery = (raw.galleryImages ?? []).filter(isNonEmptyFile);

  const existing = await prisma.accommodation.findUnique({
    where: { id },
    include: { house: true },
  });
  if (!existing || !existing.house) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  const accommodation = await prisma.accommodation.update({
    where: { id },
    data: {
      title: raw.title,
      description: raw.description,
      policies: raw.policies,
      amenities: raw.amenities,
      country: raw.country,
      countryCode: raw.countryCode,
      city: raw.city,
      fullAddress: raw.fullAddress,
      latitude: raw.latitude as number,
      longitude: raw.longitude as number,
      updatedAt: new Date(),
      updatedBy: { connect: { id: userId } },
      tag: { connect: { id: raw.tagId } },

      house: {
        update: {
          price: raw.price as number,
          discount: raw.discount ?? null,
          capacity: raw.capacity as number,
          area: raw.area as number,
          floors: raw.floors as number,
          bedrooms: raw.bedrooms as number,
          bathrooms: raw.bathrooms as number,
          currencyId: raw.currencyId,
          availableDates: raw.availableDates,
          updatedById: userId,
        },
      },
    },
    include: { house: true },
  });

  if (normalizedHero) {
    const uploadResult = await uploadDocument({
      file: normalizedHero,
      bucket: 'accommodations',
      object: `${id}/hero.webp`,
    });
    if (!uploadResult.success) throw new Error(ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED);
  }

  if (normalizedGallery.length > 0) {
    const prefix = `${id}/gallery/`;

    // Append-only sync: skip files already stored (hash dedupe). Stored files
    // are removed only through the preview delete buttons (immediate deletes),
    // never implicitly here — auto-deleting everything not re-picked would wipe
    // the gallery whenever a single image is added.
    const existingKeys = await listKeysByPrefix({ prefix, bucket: 'accommodations' });
    const existingHashes = new Set(existingKeys.map(extractHash));

    const incoming = await Promise.all(
      normalizedGallery.map(async (file: File) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const hash = createHash('sha256').update(buffer).digest('hex');
        return { file, hash };
      }),
    );

    const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));

    const uploadResults = await Promise.allSettled(
      toUpload.map(({ file, hash }) =>
        uploadDocument({
          file,
          bucket: 'accommodations',
          object: `${prefix}${hash}.webp`,
        }),
      ),
    );
    if (uploadResults.some((r) => r.status === 'rejected'))
      throw new Error(ACCOMMODATION_ERRORS.UPDATE_SOME_GALLERY_FAILED);
  }

  revalidatePath('/accommodations');
  return accommodation;
};

export const createHouseAction = async (formData: FormData): Promise<never> => {
  const backPath = '/accommodations/new?type=house';
  const raw = parseHouseFormData(formData);

  const errors = await validateHouseInput(raw);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await createHouse(formData);
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

export const updateHouseAction = async (id: string, formData: FormData): Promise<never> => {
  const backPath = `/accommodations/${id}/edit`;
  const raw = parseHouseFormData(formData);

  const errors = await validateHouseInput(raw);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateHouse(id, formData);
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
