import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardLoading = () => {
  return (
    <div className="flex w-full flex-col gap-5" aria-busy="true" aria-label="Loading dashboard">
      {/* Hero section skeleton */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-6 text-white sm:p-8">
        <div className="relative">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-9 w-72" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <div className="ms-auto flex flex-wrap gap-2">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero KPI cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-14 shrink-0 rounded-xl" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-8 w-20 shrink-0 rounded-full" />
              </div>
              <Skeleton className="mt-4 h-9 w-32" />
              <Skeleton className="mt-1.5 h-4 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supporting stats strip skeleton */}
      <Card>
        <CardContent className="flex flex-col divide-y divide-border p-0 sm:flex-row sm:divide-x sm:divide-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex min-w-0 flex-1 items-center gap-4 px-6 py-5">
              <Skeleton className="size-11 shrink-0 rounded-lg" />
              <div className="min-w-0">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="mt-1 h-3 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Growth chart skeleton */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="mb-4 h-6 w-48" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>

      {/* Mix + rankings skeleton */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-1 h-3 w-40" />
            </div>
            <div className="flex h-64 items-center justify-center gap-8">
              <Skeleton className="size-44 shrink-0 rounded-full" />
              <ul className="flex-1 space-y-3">
                <li>
                  <Skeleton className="h-6 w-3/4" />
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <Skeleton className="h-full w-1/2 rounded-full" />
                  </div>
                </li>
                <li>
                  <Skeleton className="h-6 w-3/4" />
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <Skeleton className="h-full w-2/3 rounded-full" />
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-6">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl p-2">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <Skeleton className="size-6 shrink-0 rounded-md" />
                  <Skeleton className="flex-1 h-4" />
                  <Skeleton className="h-4 w-12 shrink-0" />
                  <Skeleton className="h-4 w-16 shrink-0" />
                </div>
                <div className="ml-[34px] h-2 overflow-hidden rounded-full bg-muted">
                  <Skeleton className="h-full rounded-full" style={{ width: `${25 + i * 15}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-6">
            <Skeleton className="h-5 w-36" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl p-2">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <Skeleton className="size-6 shrink-0 rounded-md" />
                  <Skeleton className="flex-1 h-4" />
                  <Skeleton className="h-4 w-12 shrink-0" />
                  <Skeleton className="h-4 w-16 shrink-0" />
                </div>
                <div className="ml-[34px] h-2 overflow-hidden rounded-full bg-muted">
                  <Skeleton className="h-full rounded-full" style={{ width: `${30 + i * 10}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recents skeleton */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-5 w-36" />
              {Array.from({ length: 4 }).map((_, j) => (
                <Link key={j} href="#" className="-mx-2 flex items-center gap-3.5 rounded-xl px-2 py-3.5">
                  <Skeleton className="size-10 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="mt-0.5 h-3 w-40" />
                  </div>
                  <Skeleton className="size-4 shrink-0" />
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardLoading;