import { Currency } from '@repo/database';

export type CurrencyFormData = {
  title: string;
  symbol: string;
  isoCode: string;
  isActive: boolean;
};

export type CurrencyOption = {
  value: string;
  label: string;
};

export type CurrencyFormProps = {
  initialData?: Currency;
};
