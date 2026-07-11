import { ActivityType } from '@/features/activity-type';
import { Address } from '@repo/types';
import { Currency } from '@repo/database';

export type Activity = {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
  addressId: string;
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
  isActive: boolean;
  currencyId: string;
  countryCode: string;
  activityTypeId: string;
  addressDetails: string;
  discount?: number | null;
};

export type ActivityFormProps = {
  initialData?: Activity;
};

export type ActivityColumnDTO = Activity & {
  address: Address;
  currency: Currency;
  activityType: ActivityType;
};

export type ActivityDTO = Activity & {
  city: string;
  country: string;
  countryCode: string;
  addressDetails: string;
};
