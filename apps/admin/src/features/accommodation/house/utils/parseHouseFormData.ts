export const parseHouseFormData = (formData: FormData) => {
  const get = (key: string) => String(formData.get(key) ?? '').trim();
  const getNumber = (key: string) => {
    const raw = get(key);
    if (!raw) return undefined;
    const value = Number(raw);
    return Number.isNaN(value) ? undefined : value;
  };
  const getJSON = (key: string) => {
    const raw = formData.get(key);
    if (typeof raw !== 'string' || !raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  return {
    title: get('title'),
    description: get('description'),
    city: get('city'),
    country: get('country'),
    fullAddress: get('fullAddress'),
    countryCode: get('countryCode'),
    latitude: getNumber('latitude'),
    longitude: getNumber('longitude'),
    policies: getJSON('policiesJson'),
    amenities: getJSON('amenitiesJson'),
    availableDates: getJSON('availableDatesJson'),
    price: getNumber('price'),
    discount: getNumber('discount'),
    capacity: getNumber('capacity'),
    area: getNumber('area'),
    floors: getNumber('floors'),
    bedrooms: getNumber('bedrooms'),
    bathrooms: getNumber('bathrooms'),
    tagId: get('tagId'),
    currencyId: get('currencyId'),
    heroImage: formData.get('heroImage') as File | null,
    galleryImages: formData.getAll('galleryImages') as File[],
  };
};
