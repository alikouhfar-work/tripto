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
import { ACTIVITY_ERRORS } from '@/features/activity/constants';
import { parseActivityFormDataFromFormData } from '@/features/activity/utils/parseActivityFormData';
import type { ActivityInput } from '@/features/activity/types/activity';
import { deleteDocument, uploadDocument } from '@repo/documents/server';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

export const validateActivityInput = async (
  data: ActivityInput,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) errors.title = 'Title is required';
  if (!data.activityTypeId.trim()) errors.activityTypeId = 'Activity Type is required';
  if (!data.currencyId.trim()) errors.currencyId = 'Currency is required';
  if (!data.country.trim()) errors.country = 'Country is required';
  if (!data.countryCode.trim()) errors.countryCode = 'Country code is required';
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.fullAddress.trim()) errors.fullAddress = 'Full address is required';

  if (Number.isNaN(data.price)) {
    errors.price = 'Price is required';
  } else if (!Number.isFinite(data.price) || data.price <= 0) {
    errors.price = 'Price must be a positive number';
  }

  if (data.discount !== null) {
    if (Number.isNaN(data.discount)) {
      errors.discount = 'Discount must be a number';
    } else if (!Number.isFinite(data.discount) || data.discount <= 0) {
      errors.discount = 'Discount must be a positive number';
    } else if (data.discount > 100) {
      errors.discount = 'Discount cannot exceed 100%';
    }
  }

  const [currency, activityType] = await Promise.all([
    data.currencyId.trim()
      ? prisma.currency.findUnique({ where: { id: data.currencyId } })
      : null,
    data.activityTypeId.trim()
      ? prisma.activityType.findUnique({ where: { id: data.activityTypeId } })
      : null,
  ]);
  if (data.currencyId.trim() && !currency) {
    errors.currencyId = 'Selected currency no longer exists';
  }
  if (data.activityTypeId.trim() && !activityType) {
    errors.activityTypeId = 'Selected activity type no longer exists';
  }

  if (data.heroImage) {
    if (!ALLOWED_TYPES.includes(data.heroImage.type)) {
      errors.heroImage = 'Only PNG, JPG, WEBP or AVIF files are allowed';
    } else if (data.heroImage.size > MAX_FILE_SIZE) {
      errors.heroImage = 'File size must be under 5MB';
    }
  }

  return errors;
};

export const createActivity = async (data: ActivityInput) => {
  const userId = await requireUserId();

  const errors = await validateActivityInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACTIVITY_ERRORS.CREATE_FAILED);
  }

  const existing = await prisma.activity.findUnique({
    where: {
      title_activityTypeId: {
        title: data.title,
        activityTypeId: data.activityTypeId,
      },
    },
  });
  if (existing) throw new Error(ACTIVITY_ERRORS.DUPLICATE);

  const titleTaken = await prisma.activity.findUnique({ where: { title: data.title } });
  if (titleTaken) throw new Error(ACTIVITY_ERRORS.DUPLICATE_TITLE);

  const activity = await prisma.activity.create({
    data: {
      title: data.title,
      price: data.price,
      discount: data.discount,
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      fullAddress: data.fullAddress,
      createdBy: { connect: { id: userId } },
      currency: { connect: { id: data.currencyId } },
      activityType: { connect: { id: data.activityTypeId } },
    },
  });

  if (data.heroImage) {
    try {
      const uploadResult = await uploadDocument({
        bucket: 'activities',
        file: data.heroImage,
        object: `${activity.id}/hero.webp`,
      });
      if (!uploadResult.success) throw new Error(ACTIVITY_ERRORS.CREATE_IMAGE_FAILED);
    } catch (error) {
      // Compensate: don't leave an imageless row behind on upload failure.
      await prisma.activity.delete({ where: { id: activity.id } }).catch(() => undefined);
      throw error instanceof Error ? error : new Error(ACTIVITY_ERRORS.CREATE_IMAGE_FAILED);
    }
  }

  revalidatePath('/activities');
  return activity;
};

export const updateActivity = async (id: string, data: ActivityInput) => {
  const userId = await requireUserId();

  const errors = await validateActivityInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACTIVITY_ERRORS.UPDATE_FAILED);
  }

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  const duplicate = await prisma.activity.findFirst({
    where: { title: data.title, NOT: { id } },
  });
  if (duplicate) {
    throw new Error(
      duplicate.activityTypeId === data.activityTypeId
        ? ACTIVITY_ERRORS.DUPLICATE
        : ACTIVITY_ERRORS.DUPLICATE_TITLE,
    );
  }

  const activity = await prisma.activity.update({
    where: { id },
    data: {
      title: data.title,
      price: data.price,
      discount: data.discount,
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      fullAddress: data.fullAddress,
      currency: { connect: { id: data.currencyId } },
      activityType: { connect: { id: data.activityTypeId } },
      updatedAt: new Date(),
      updatedBy: { connect: { id: userId } },
    },
  });

  if (data.heroImage) {
    const uploadResult = await uploadDocument({
      object: `${id}/hero.webp`,
      bucket: 'activities',
      file: data.heroImage,
    });
    if (!uploadResult.success) throw new Error(ACTIVITY_ERRORS.UPDATE_IMAGE_FAILED);
  }

  revalidatePath('/activities');
  return activity;
};

export const deleteActivity = async (id: string) => {
  await requireUserId();

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  await prisma.activity.delete({ where: { id } });

  try {
    await deleteDocument({ bucket: 'activities', object: `${id}/hero.webp` });
  } catch {
    // Best-effort cleanup — failures are safe to ignore.
  }

  revalidatePath('/activities');
  return { id };
};

export const createActivityAction = async (formData: FormData): Promise<never> => {
  const data = parseActivityFormDataFromFormData(formData);

  const errors = await validateActivityInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState('/activities/new', { errors, values: formDataToValues(formData) });
  }

  try {
    await createActivity(data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACTIVITY_ERRORS),
      ACTIVITY_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState('/activities/new', {
      errors:
        message === ACTIVITY_ERRORS.DUPLICATE || message === ACTIVITY_ERRORS.DUPLICATE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/activities');
  redirect('/activities');
};

export const updateActivityAction = async (id: string, formData: FormData): Promise<never> => {
  const backPath = `/activities/${id}/edit`;
  const data = parseActivityFormDataFromFormData(formData);

  const errors = await validateActivityInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateActivity(id, data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACTIVITY_ERRORS),
      ACTIVITY_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === ACTIVITY_ERRORS.DUPLICATE || message === ACTIVITY_ERRORS.DUPLICATE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

export const toggleActivityActive = async (id: string) => {
  await requireUserId();

  const existing = await prisma.activity.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  // Conditional write: no-ops if the row changed between read and write,
  // instead of flipping twice on concurrent toggles.
  const { count } = await prisma.activity.updateMany({
    where: { id, isActive: existing.isActive },
    data: { isActive: !existing.isActive },
  });
  if (count === 0) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  revalidatePath('/activities');
  return { id, isActive: !existing.isActive };
};
