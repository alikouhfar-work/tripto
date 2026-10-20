import type { ActivityInput } from '@/features/activity/types/activity';

export const parseActivityFormDataFromFormData = (formData: FormData): ActivityInput => {
  const getString = (key: string) => String(formData.get(key) ?? '').trim();

  const rawPrice = getString('price');
  const rawDiscount = getString('discount');

  const file = formData.get('heroImage');

  return {
    title: getString('title'),
    activityTypeId: getString('activityTypeId'),
    currencyId: getString('currencyId'),
    country: getString('country'),
    countryCode: getString('countryCode'),
    city: getString('city'),
    fullAddress: getString('fullAddress'),
    price: rawPrice === '' ? NaN : Number(rawPrice),
    discount: rawDiscount === '' ? null : Number(rawDiscount),
    heroImage: file instanceof File && file.size > 0 ? file : null,
  };
};
