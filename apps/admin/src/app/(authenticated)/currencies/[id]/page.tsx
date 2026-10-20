import { CurrencyDetailView } from '@/features/currency';
import { getCurrency } from '@/features/currency/server/queries';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type CurrencyDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getCurrencyCached = cache(getCurrency);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<CurrencyDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const currency = await getCurrencyCached(id);
    return { title: `${currency.title} — Details` };
  } catch {
    return { title: 'Currency details' };
  }
};

const CurrencyDetailPage = async ({
  params,
}: {
  params: Promise<CurrencyDetailPageParams>;
}) => {
  const { id } = await params;
  let currency;
  try {
    currency = await getCurrencyCached(id);
  } catch {
    notFound();
  }
  return <CurrencyDetailView currency={currency} />;
};

export default CurrencyDetailPage;
