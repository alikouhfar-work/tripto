'use server';

import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireUserId } from '@/server/require-user';
import { formDataToValues, actionErrorMessage, redirectWithFormState } from '@/server/form-state';
import { CURRENCY_ERRORS } from '@/features/currency/constants';
import type { CurrencyFormData } from '@/features/currency/types/currency';

const validateCurrencyInput = async (
  data: CurrencyFormData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) errors.title = 'Title is required';
  if (!data.symbol.trim()) errors.symbol = 'Symbol is required';

  const isoCode = data.isoCode.trim();
  if (!isoCode) {
    errors.isoCode = 'ISO Code is required';
  } else if (isoCode.length !== 3) {
    errors.isoCode = 'ISO Code must be 3 letters';
  } else if (isoCode !== isoCode.toUpperCase() || !/^[A-Z]+$/.test(isoCode)) {
    errors.isoCode = 'ISO Code must be uppercase letters';
  }

  return errors;
};

export const parseCurrencyFormData = async (formData: FormData): Promise<CurrencyFormData> => {
  return {
    title: String(formData.get('title') ?? '').trim(),
    symbol: String(formData.get('symbol') ?? '').trim(),
    isoCode: String(formData.get('isoCode') ?? '').trim(),
  };
};

export const createCurrency = async (data: CurrencyFormData) => {
  const userId = await requireUserId();

  const errors = await validateCurrencyInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(CURRENCY_ERRORS.CREATE_FAILED);
  }

  const existing = await prisma.currency.findUnique({
    where: { title_isoCode: { title: data.title, isoCode: data.isoCode } },
  });
  if (existing) throw new Error(CURRENCY_ERRORS.DUPLICATE_CODE_TITLE);

  const currency = await prisma.currency.create({
    data: { ...data, createdById: userId },
  });

  revalidatePath('/currencies');
  return currency;
};

export const updateCurrency = async (id: string, data: CurrencyFormData) => {
  const userId = await requireUserId();

  const errors = await validateCurrencyInput(data);
  if (Object.keys(errors).length > 0) {
    throw new Error(CURRENCY_ERRORS.UPDATE_FAILED);
  }

  const existing = await prisma.currency.findUnique({ where: { id } });
  if (!existing) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  const duplicate = await prisma.currency.findUnique({
    where: { title_isoCode: { title: data.title, isoCode: data.isoCode } },
  });
  if (duplicate && duplicate.id !== id)
    throw new Error(CURRENCY_ERRORS.DUPLICATE_CODE_TITLE);

  const currency = await prisma.currency.update({
    where: { id },
    data: { ...data, updatedById: userId },
  });

  revalidatePath('/currencies');
  return currency;
};

export const deleteCurrency = async (id: string) => {
  await requireUserId();

  const existing = await prisma.currency.findUnique({ where: { id } });
  if (!existing) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  const [activityUse, houseUse, roomUse] = await Promise.all([
    prisma.activity.count({ where: { currencyId: id } }),
    prisma.house.count({ where: { currencyId: id } }),
    prisma.room.count({ where: { currencyId: id } }),
  ]);
  if (activityUse + houseUse + roomUse > 0) throw new Error(CURRENCY_ERRORS.IN_USE);

  await prisma.currency.delete({ where: { id } });

  revalidatePath('/currencies');
  return { id };
};

export const createCurrencyAction = async (formData: FormData): Promise<never> => {
  const data = await parseCurrencyFormData(formData);

  const errors = await validateCurrencyInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState('/currencies/new', { errors, values: formDataToValues(formData) });
  }

  try {
    await createCurrency(data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(CURRENCY_ERRORS),
      CURRENCY_ERRORS.CREATE_FAILED,
    );
    redirectWithFormState('/currencies/new', {
      errors:
        message === CURRENCY_ERRORS.DUPLICATE_CODE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  revalidatePath('/currencies');
  redirect('/currencies');
};

export const updateCurrencyAction = async (id: string, formData: FormData): Promise<never> => {
  const backPath = `/currencies/${id}/edit`;
  const data = await parseCurrencyFormData(formData);

  const errors = await validateCurrencyInput(data);
  if (Object.keys(errors).length > 0) {
    redirectWithFormState(backPath, { errors, values: formDataToValues(formData) });
  }

  try {
    await updateCurrency(id, data);
  } catch (error) {
    const message = actionErrorMessage(
      error,
      Object.values(CURRENCY_ERRORS),
      CURRENCY_ERRORS.UPDATE_FAILED,
    );
    redirectWithFormState(backPath, {
      errors:
        message === CURRENCY_ERRORS.DUPLICATE_CODE_TITLE
          ? { ...errors, title: message }
          : errors,
      values: formDataToValues(formData),
      message,
    });
  }

  return redirectWithFormState(backPath, { success: true });
};

export const toggleCurrencyActive = async (id: string) => {
  await requireUserId();

  const existing = await prisma.currency.findUnique({ where: { id } });
  if (!existing) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  // Conditional write: no-ops if the row changed between read and write,
  // instead of flipping twice on concurrent toggles.
  const { count } = await prisma.currency.updateMany({
    where: { id, isActive: existing.isActive },
    data: { isActive: !existing.isActive },
  });
  if (count === 0) throw new Error(CURRENCY_ERRORS.NOT_FOUND);

  revalidatePath('/currencies');
  return { id, isActive: !existing.isActive };
};
