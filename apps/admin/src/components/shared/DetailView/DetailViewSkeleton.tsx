import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/** Loading skeleton for readonly `/{entity}/{id}` detail routes. */
export const DetailViewSkeleton = ({
  rowCount = 7,
  showHero = true,
}: {
  rowCount?: number;
  showHero?: boolean;
}) => {
  return (
    <div className="mx-auto w-full max-w-4xl" aria-busy="true" aria-label="Loading details">
      <Skeleton className="mb-5 h-5 w-40" />
      <Card className="mb-6 overflow-hidden py-0">
        {showHero && <Skeleton className="h-48 w-full rounded-none sm:h-64" />}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="w-full space-y-2">
            <Skeleton className="h-9 w-64 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
            <div className="flex gap-1.5 pt-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="hidden h-6 w-16 rounded-full sm:block" />
            </div>
          </div>
          <Skeleton className="h-10 w-20 shrink-0 rounded-lg" />
        </div>
      </Card>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {Array.from({ length: rowCount }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" style={{ maxWidth: `${320 - (i % 3) * 70}px` }} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
