import z from 'zod';

export const bedSchema = z.object({
  king: z.number().int().nonnegative('King bed count must be non-negative').optional(),
  queen: z.number().int().nonnegative('Queen bed count must be non-negative').optional(),
  double: z.number().int().nonnegative('Double bed count must be non-negative').optional(),
  single: z.number().int().nonnegative('Single bed count must be non-negative').optional(),
});