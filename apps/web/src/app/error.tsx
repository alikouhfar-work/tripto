'use client';

export default function WebError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-slate-900">Something went wrong</h2>
      <p className="mt-2 text-slate-500">{error.message || 'Please try again.'}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  );
}
