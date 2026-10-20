import { Currency } from '@repo/database';
import type { FormState } from '@/server/form-state';

export type { Currency };

export type CurrencyFormData = {
  title: string;
  symbol: string;
  isoCode: string;
};

export type CurrencyOption = {
  value: string;
  label: string;
};

export type CurrencyFormProps = {
  initialData?: Currency;
  state?: FormState;
};
