import type { FormState } from '@/server/form-state';

export type ActivityType = {
  id: string;
  name: string;
  icon: string;
  title: string;
  isActive: boolean;
  emoji: string | null;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ActivityTypeFormData = {
  name: string;
  icon: string;
  title: string;
  emoji: string | null;
};

export type ActivityTypeOption = {
  value: string;
  label: string;
};

export type ActivityTypeFormProps = {
  initialData?: ActivityType;
  state?: FormState;
};
