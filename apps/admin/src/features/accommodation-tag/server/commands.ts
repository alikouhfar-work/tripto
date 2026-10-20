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
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';
import type { AccommodationTagFormData } from '@/features/accommodation-tag/types/accommodationTag';

const validateAccommodationTagInput = async (
  data: AccommodationTagFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) errors.title = 'Title is required';
  if (!data.emoji.trim()) errors.emoji = 'Emoji is required';
  if (!data.textColor.trim()) errors.textColor = 'Text color is required';
  if (!data.borderColor.trim()) errors.borderColor = 'Border color is required';
  if (!data.backgroundColor.trim()) errors.backgroundColor = 'Background color is required';

  return errors;
};

export const parseAccommodationTagFormData = async (
  formData: FormData,
): Promise<AccommodationTagFormData> => {
  return {
    title: String(formData.get('title') ?? '').trim(),
    emoji: String(formData.get('emoji') ?? '').trim(),
    textColor: String(formData.get('textColor') ?? '').trim(),
    borderColor: String(formData.get('borderColor') ?? '').trim(),
    backgroundColor: String(formData.get('backgroundColor') ?? '').trim(),
  };
};

export const createAccommodationTag = async (data: AccommodationTagFormData) => {
  const userId = await requireUserId();

  const errors = await validateAccommodationTagInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_TAG_ERRORS.CREATE_FAILED);
  }

  const existing = await prisma.accommodationTag.findUnique({
    where: {
      title_emoji_textColor_borderColor_backgroundColor: {
        title: data.title,
        emoji: data.emoji,
        textColor: data.textColor,
        borderColor: data.borderColor,
        backgroundColor: data.backgroundColor,
      },
    },
  });
  if (existing) throw new Error(ACCOMMODATION_TAG_ERRORS.DUPLICATE_NAME_TITLE);

  const accommodationTag = await prisma.accommodationTag.create({
    data: { ...data, createdById: userId },
  });

  revalidatePath('/accommodation-tags');
  return accommodationTag;
};

export const updateAccommodationTag = async (id: string, data: AccommodationTagFormData) => {
  const userId = await requireUserId();

  const errors = await validateAccommodationTagInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED);
  }

  const existing = await prisma.accommodationTag.findUnique({ where: { id } });
  if (!existing) throw new Error(ACCOMMODATION_TAG_ERRORS.NOT_FOUND);

  const duplicate = await prisma.accommodationTag.findFirst({
    where: {
      title: data.title,
      emoji: data.emoji,
      textColor: data.textColor,
      borderColor: data.borderColor,
      backgroundColor: data.backgroundColor,
      NOT: { id },
    },
  });
  if (duplicate) throw new Error(ACCOMMODATION_TAG_ERRORS.DUPLICATE_NAME_TITLE);

  const accommodationTag = await prisma.accommodationTag.update({
    where: { id },
    data: { ...data, updatedAt: new Date(), updatedById: userId },
  });

  revalidatePath('/accommodation-tags');
  return accommodationTag;
};

export const deleteAccommodationTag = async (id: string) => {
  await requireUserId();

  const existing = await prisma.accommodationTag.findUnique({ where: { id } });
  if (!existing) throw new Error(ACCOMMODATION_TAG_ERRORS.NOT_FOUND);

  const inUse = await prisma.accommodation.count({ where: { tagId: id } });
  if (inUse > 0) throw new Error(ACCOMMODATION_TAG_ERRORS.IN_USE);

  await prisma.accommodationTag.delete({ where: { id } });

  revalidatePath('/accommodation-tags');
  return { id };
};

export const createAccommodationTagAction = async (formData: FormData): Promise<never> => {
  const data = await parseAccommodationTagFormData(formData);

  const errors = await validateAccommodationTagInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState('/accommodation-tags/new', {
      errors,
      values: formDataToValues(formData),
    });
  }

  try {
    await createAccommodationTag(data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACCOMMODATION_TAG_ERRORS),
      ACCOMMODATION_TAG_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState('/accommodation-tags/new', {
      errors:
        message === ACCOMMODATION_TAG_ERRORS.DUPLICATE_NAME_TITLE ||
        message === ACCOMMODATION_TAG_ERRORS.DUPLICATE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/accommodation-tags');
  redirect('/accommodation-tags');
};

export const updateAccommodationTagAction = async (
  id: string,
  formData: FormData,
): Promise<never> => {
  const backPath = `/accommodation-tags/${id}/edit`;
  const data = await parseAccommodationTagFormData(formData);

  const errors = await validateAccommodationTagInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateAccommodationTag(id, data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(ACCOMMODATION_TAG_ERRORS),
      ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === ACCOMMODATION_TAG_ERRORS.DUPLICATE_NAME_TITLE ||
        message === ACCOMMODATION_TAG_ERRORS.DUPLICATE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

export const toggleAccommodationTagActive = async (id: string) => {
  await requireUserId();

  const existing = await prisma.accommodationTag.findUnique({ where: { id } });
  if (!existing) throw new Error(ACCOMMODATION_TAG_ERRORS.NOT_FOUND);

  // Conditional write: no-ops if the row changed between read and write,
  // instead of flipping twice on concurrent toggles.
  const { count } = await prisma.accommodationTag.updateMany({
    where: { id, isActive: existing.isActive },
    data: { isActive: !existing.isActive },
  });
  if (count === 0) throw new Error(ACCOMMODATION_TAG_ERRORS.NOT_FOUND);

  revalidatePath('/accommodation-tags');
  return { id, isActive: !existing.isActive };
};
