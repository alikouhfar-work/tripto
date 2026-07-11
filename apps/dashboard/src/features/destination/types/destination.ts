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
};

export type DestinationFormData = {
  city: string;
  slogan: string;
  country: string;
  isActive: boolean;
  seasons: SeasonEnum[];
};

export type DestinationFormProps = {
  initialData?: Destination;
};
