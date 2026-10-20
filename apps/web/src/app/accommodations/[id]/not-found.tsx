import Link from 'next/link';

export default function AccommodationDetailsNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-slate-900">Accommodation not found</h2>
      <p className="mt-2 text-slate-500">
        The accommodation you are looking for does not exist or is no longer available.
      </p>
      <Link
        href="/accommodations"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Browse accommodations
      </Link>
    </main>
  );
}
