import { ActivityType } from '@/features/activity-type';
import type { FormState } from '@/server/form-state';
import { Currency } from '@repo/database';

export type Activity = {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
  country: string;
  countryCode: string;
  city: string;
  fullAddress: string;
  currencyId: string;
  activityTypeId: string;
  discount: number | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ActivityFormData = {
  city: string;
  title: string;
  price: number;
  country: string;
  currencyId: string;
  countryCode: string;
  activityTypeId: string;
  fullAddress: string;
  discount: number | null;
};

export type ActivityInput = ActivityFormData & {
  heroImage: File | null;
};

export type ActivityFormProps = {
  initialData?: ActivityDTO;
  state?: FormState;
};

export type ActivityColumnDTO = Activity & {
  currency: Currency;
  activityType: ActivityType;
};

export type ActivityDTO = Activity & {
  currency: Currency;
  activityType: ActivityType;
};
