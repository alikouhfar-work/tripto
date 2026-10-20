import type { HotelFormData } from '@/features/accommodation/hotel/types/hotelForm';

const getString = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();

const getNumber = (formData: FormData, key: string): number | undefined => {
  const raw = String(formData.get(key) ?? '').trim();
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isNaN(value) ? undefined : value;
};

const getJSON = <T>(formData: FormData, key: string, fallback: T): T => {
  const raw = formData.get(key);
  if (typeof raw !== 'string' || !raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const parseHotelFormData = (formData: FormData) => {
  const data: HotelFormData = {
    title: getString(formData, 'title'),
    tagId: getString(formData, 'tagId'),
    description: getString(formData, 'description'),
    country: getString(formData, 'country'),
    countryCode: getString(formData, 'countryCode'),
    city: getString(formData, 'city'),
    fullAddress: getString(formData, 'fullAddress'),
    latitude: getNumber(formData, 'latitude') as unknown as number,
    longitude: getNumber(formData, 'longitude') as unknown as number,
    policies: getJSON(formData, 'policiesJson', []),
    amenities: getJSON(formData, 'amenitiesJson', []),
  };

  const heroImage = formData.get('heroImage') as File | null;
  const galleryImages = formData.getAll('galleryImages') as File[];

  return { data, heroImage, galleryImages };
};
