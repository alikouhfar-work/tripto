import type { FormState } from '@/server/form-state';
import { SeasonEnum } from '@repo/enums';

export type Destination = {
  id: string;
  city: string;
  slogan: string;
  country: string;
  isActive: boolean;
  seasons: SeasonEnum[];
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
  accommodationCount?: number;
  accommodations?: Array<{ id: string; title: string }>;
};

export type DestinationFormData = {
  city: string;
  slogan: string;
  country: string;
  seasons: SeasonEnum[];
};

export type DestinationFormProps = {
  initialData?: Destination;
  state?: FormState;
};
