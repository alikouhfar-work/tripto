export type RoomFormData = {
  title: string;
  area: number;
  count: number;
  price: number;
  currencyId: string;
  discount: number | null;
  capacity: number;
  bedrooms: number | null;
  bathrooms: number;
  amenities: Array<{ title: string; icon: string }>;
  beds: { king?: number; queen?: number; double?: number; single?: number };
};

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

const getBeds = (formData: FormData): RoomFormData['beds'] => {
  const king = getNumber(formData, 'bed_king');
  const queen = getNumber(formData, 'bed_queen');
  const double = getNumber(formData, 'bed_double');
  const single = getNumber(formData, 'bed_single');

  const beds: RoomFormData['beds'] = {};
  if (king !== undefined) beds.king = king;
  if (queen !== undefined) beds.queen = queen;
  if (double !== undefined) beds.double = double;
  if (single !== undefined) beds.single = single;

  return beds;
};

export const parseRoomFormData = (formData: FormData): RoomFormData => {
  const amenities = getJSON(formData, 'amenitiesJson', [])
    .map((a: any) => ({ title: a.title, icon: a.icon }))
    .filter((a: { title: string }) => a.title);

  return {
    title: getString(formData, 'title'),
    area: getNumber(formData, 'area') ?? 0,
    count: getNumber(formData, 'count') ?? 1,
    price: getNumber(formData, 'price') ?? 0,
    currencyId: getString(formData, 'currencyId'),
    discount: getNumber(formData, 'discount') ?? null,
    capacity: getNumber(formData, 'capacity') ?? 0,
    bedrooms: getNumber(formData, 'bedrooms') ?? null,
    bathrooms: getNumber(formData, 'bathrooms') ?? 0,
    amenities,
    beds: getBeds(formData),
  };
};