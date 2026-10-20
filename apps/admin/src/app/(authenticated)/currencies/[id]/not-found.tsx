import Link from 'next/link';
import { IconCurrencyDollar } from '@tabler/icons-react';

const CurrencyNotFound = () => {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <IconCurrencyDollar size={24} />
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Currency not found
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        The currency you are looking for does not exist or was deleted.
      </p>
      <Link
        href="/currencies"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to currencies
      </Link>
    </div>
  );
};

export default CurrencyNotFound;
