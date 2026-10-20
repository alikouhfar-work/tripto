'use server';

import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireUserId } from '@/server/require-user';
import {
  actionErrorMessage,
  formDataToValues,
  redirectWithFormState,
} from '@/server/form-state';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { SeasonEnum } from '@repo/enums';
import type { DestinationFormData } from '@/features/destination/types/destination';

const validateDestinationInput = async (
  data: DestinationFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.country.trim()) errors.country = 'Country is required';
  if (!data.slogan.trim()) errors.slogan = 'Slogan is required';

  if (!data.seasons || data.seasons.length === 0) {
    errors.seasons = 'Season is required';
  } else {
    const validSeasons = Object.values(SeasonEnum) as string[];
    const hasInvalid = data.seasons.some((season) => !validSeasons.includes(season));
    if (hasInvalid) errors.seasons = 'Invalid season selected';
  }

  return errors;
};

export const parseDestinationFormData = async (
  formData: FormData,
): Promise<DestinationFormData> => {
  return {
    city: String(formData.get('city') ?? '').trim(),
    country: String(formData.get('country') ?? '').trim(),
    slogan: String(formData.get('slogan') ?? '').trim(),
    seasons: formData.getAll('seasons').map((value) => String(value)) as SeasonEnum[],
  };
};

export const createDestination = async (data: DestinationFormData) => {
  const userId = await requireUserId();

  const errors = await validateDestinationInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(DESTINATION_ERRORS.CREATE_FAILED);
  }

  const existing = await prisma.destination.findUnique({
    where: {
      country_city_slogan: {
        city: data.city,
        slogan: data.slogan,
        country: data.country,
      },
    },
  });
  if (existing) throw new Error(DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN);

  const hasAccommodation = await prisma.accommodation.findFirst({
    where: {
      city: data.city,
      country: data.country,
    },
    select: { id: true },
  });
  if (!hasAccommodation) throw new Error(DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION);

  const destination = await prisma.destination.create({
    data: {
      city: data.city,
      slogan: data.slogan,
      country: data.country,
      seasons: data.seasons,
      createdById: userId,
    },
  });

  revalidatePath('/destinations');
  return destination;
};

export const updateDestination = async (id: string, data: DestinationFormData) => {
  const userId = await requireUserId();

  const errors = await validateDestinationInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(DESTINATION_ERRORS.UPDATE_FAILED);
  }

  const existing = await prisma.destination.findUnique({ where: { id } });
  if (!existing) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  const duplicate = await prisma.destination.findUnique({
    where: {
      country_city_slogan: {
        city: data.city,
        slogan: data.slogan,
        country: data.country,
      },
    },
  });
  if (duplicate && duplicate.id !== id)
    throw new Error(DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN);

  // Keep the create-time invariant: a destination must sit where
  // accommodations exist — re-check when the location moved.
  if (data.city !== existing.city || data.country !== existing.country) {
    const hasAccommodation = await prisma.accommodation.findFirst({
      where: { city: data.city, country: data.country },
      select: { id: true },
    });
    if (!hasAccommodation) throw new Error(DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION);
  }

  const destination = await prisma.destination.update({
    where: { id },
    data: {
      city: data.city,
      slogan: data.slogan,
      country: data.country,
      seasons: data.seasons,
      updatedAt: new Date(),
      updatedById: userId,
    },
  });

  revalidatePath('/destinations');
  return destination;
};

export const deleteDestination = async (id: string) => {
  await requireUserId();

  const existing = await prisma.destination.findUnique({ where: { id } });
  if (!existing) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  const inUse = await prisma.accommodation.count({ where: { destinationId: id } });
  if (inUse > 0) throw new Error(DESTINATION_ERRORS.IN_USE);

  await prisma.destination.delete({ where: { id } });

  revalidatePath('/destinations');
  return { id };
};

export const createDestinationAction = async (formData: FormData): Promise<never> => {
  const data = await parseDestinationFormData(formData);

  const errors = await validateDestinationInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState('/destinations/new', {
      errors,
      values: formDataToValues(formData),
    });
  }

  try {
    await createDestination(data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(DESTINATION_ERRORS),
      DESTINATION_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState('/destinations/new', {
      errors:
        message === DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN
          ? { ...errors, city: message }
          : message === DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION
            ? { ...errors, city: message, country: message }
            : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/destinations');
  redirect('/destinations');
};

export const updateDestinationAction = async (
  id: string,
  formData: FormData,
): Promise<never> => {
  const backPath = `/destinations/${id}/edit`;
  const data = await parseDestinationFormData(formData);

  const errors = await validateDestinationInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateDestination(id, data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(DESTINATION_ERRORS),
      DESTINATION_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN
          ? { ...errors, city: message }
          : message === DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION
            ? { ...errors, city: message, country: message }
            : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

export const toggleDestinationActive = async (id: string) => {
  await requireUserId();

  const existing = await prisma.destination.findUnique({ where: { id } });
  if (!existing) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  // Conditional write: no-ops if the row changed between read and write,
  // instead of flipping twice on concurrent toggles.
  const { count } = await prisma.destination.updateMany({
    where: { id, isActive: existing.isActive },
    data: { isActive: !existing.isActive },
  });
  if (count === 0) throw new Error(DESTINATION_ERRORS.NOT_FOUND);

  revalidatePath('/destinations');
  return { id, isActive: !existing.isActive };
};
