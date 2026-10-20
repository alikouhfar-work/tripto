import type { FormState } from '@/server/form-state';

export type AccommodationTag = {
  id: string;
  title: string;
  emoji: string;
  textColor: string;
  isActive: boolean;
  borderColor: string;
  backgroundColor: string;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AccommodationTagProps = {
  emoji: string;
  title: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};

export type AccommodationTagFormData = {
  title: string;
  emoji: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};

export type AccommodationTagOption = {
  value: string;
  label: string;
};

export type AccommodationTagFormProps = {
  initialData?: AccommodationTag;
  state?: FormState;
};
