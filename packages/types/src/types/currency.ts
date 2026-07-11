export type Currency = {
  id: string;
  title: string;
  symbol: string;
  isoCode: string;
  isActive: boolean;
  createdById: string | null;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};
