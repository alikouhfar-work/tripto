import z from 'zod';

export const roomSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  area: z.number({ error: 'Area is required' }).positive('Area must be positive'),
  count: z.number({ error: 'Count is required' }).positive('Count must be positive'),
  price: z.number({ error: 'Price is required' }).positive('Price must be positive'),
  discount: z.number().positive('Discount must be positive').nullish(),
  capacity: z.number({ error: 'Capacity is required' }).positive('Capacity must be positive'),
  bedrooms: z.number().nonnegative('Bedrooms cannot be negative').nullish(),
  bathrooms: z
    .number({ error: 'Bathrooms count is required' })
    .positive('Bathrooms count must be positive'),
  amenities: z.array(z.object({
    title: z.string().min(1, 'Amenity title is required'),
    icon: z.string().optional(),
  })).min(1, 'Amenities is required'),
  galleryImages: z.array(z.string()).nullish(),
  beds: z.object({
    king: z.number().int().nonnegative('King bed count must be non-negative').optional(),
    queen: z.number().int().nonnegative('Queen bed count must be non-negative').optional(),
    double: z.number().int().nonnegative('Double bed count must be non-negative').optional(),
    single: z.number().int().nonnegative('Single bed count must be non-negative').optional(),
  }).optional(),
});

export type RoomSchema = z.infer<typeof roomSchema>;