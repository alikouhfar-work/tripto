import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-slate-900">Page not found</h2>
      <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back home
      </Link>
    </main>
  );
}
