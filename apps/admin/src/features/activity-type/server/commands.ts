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
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import type { ActivityTypeFormData } from '@/features/activity-type/types/activityType';

const validateActivityTypeInput = async (
  data: ActivityTypeFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = 'Name is required';
  } else if (name !== name.toUpperCase()) {
    errors.name = 'Name must be uppercase letters';
  }

  if (!data.title.trim()) errors.title = 'Title is required';

  const icon = data.icon.trim();
  if (!icon) {
    errors.icon = 'Icon is required';
  } else if (!icon.startsWith('Icon')) {
    errors.icon = 'This icon is not from Tabler Icons';
  }

  return errors;
};

export const parseActivityTypeFormData = async (
  formData: FormData,
): Promise<ActivityTypeFormData> => {
  const emojiRaw = String(formData.get('emoji') ?? '').trim();
  return {
    name: String(formData.get('name') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    icon: String(formData.get('icon') ?? '').trim(),
    emoji: emojiRaw === '' ? null : emojiRaw,
  };
};

export const createActivityType = async (data: ActivityTypeFormData) => {
  const userId = await requireUserId();

  const errors = await validateActivityTypeInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACTIVITY_TYPE_ERRORS.CREATE_FAILED);
  }

  const existing = await prisma.activityType.findUnique({
    where: { name_title: { name: data.name, title: data.title } },
  });
  if (existing) throw new Error(ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE);

  const activityType = await prisma.activityType.create({
    data: { ...data, createdById: userId },
  });

  revalidatePath('/activity-types');
  return activityType;
};

export const updateActivityType = async (id: string, data: ActivityTypeFormData) => {
  const userId = await requireUserId();

  const errors = await validateActivityTypeInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACTIVITY_TYPE_ERRORS.UPDATE_FAILED);
  }

  const existing = await prisma.activityType.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  const duplicate = await prisma.activityType.findFirst({
    where: { name: data.name, title: data.title, NOT: { id } },
  });
  if (duplicate) throw new Error(ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE);

  const activityType = await prisma.activityType.update({
    where: { id },
    data: { ...data, updatedAt: new Date(), updatedById: userId },
  });

  revalidatePath('/activity-types');
  return activityType;
};

export const deleteActivityType = async (id: string) => {
  await requireUserId();

  const existing = await prisma.activityType.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  const inUse = await prisma.activity.count({ where: { activityTypeId: id } });
  if (inUse > 0) throw new Error(ACTIVITY_TYPE_ERRORS.IN_USE);

  await prisma.activityType.delete({ where: { id } });

  revalidatePath('/activity-types');
  return { id };
};

export const createActivityTypeAction = async (formData: FormData): Promise<never> => {
  const data = await parseActivityTypeFormData(formData);

  const errors = await validateActivityTypeInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState('/activity-types/new', { errors, values: formDataToValues(formData) });
  }

  try {
    await createActivityType(data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACTIVITY_TYPE_ERRORS),
      ACTIVITY_TYPE_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState('/activity-types/new', {
      errors:
        message === ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/activity-types');
  redirect('/activity-types');
};

export const updateActivityTypeAction = async (id: string, formData: FormData): Promise<never> => {
  const backPath = `/activity-types/${id}/edit`;
  const data = await parseActivityTypeFormData(formData);

  const errors = await validateActivityTypeInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateActivityType(id, data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACTIVITY_TYPE_ERRORS),
      ACTIVITY_TYPE_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

export const toggleActivityTypeActive = async (id: string) => {
  await requireUserId();

  const existing = await prisma.activityType.findUnique({ where: { id } });
  if (!existing) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  // Conditional write: no-ops if the row changed between read and write,
  // instead of flipping twice on concurrent toggles.
  const { count } = await prisma.activityType.updateMany({
    where: { id, isActive: existing.isActive },
    data: { isActive: !existing.isActive },
  });
  if (count === 0) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  revalidatePath('/activity-types');
  return { id, isActive: !existing.isActive };
};
