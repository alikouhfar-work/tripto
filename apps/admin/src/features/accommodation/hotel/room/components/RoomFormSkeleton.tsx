import { FieldWithErrorSkeleton } from '@/components/shared/FieldWithError';
import { Skeleton } from '@/components/ui/skeleton';
import { ModificationFormSectionSkeleton } from '@/components/shared/ModificationFormSection';
import { Fragment } from 'react';

/** Loading placeholder matching the RoomForm layout (header + sections + sidebar). */
export const RoomFormSkeleton = () => {
  return (
    <Fragment>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Skeleton className="h-9 w-60" />
          <Skeleton className="mt-1 h-6 w-75 rounded-sm" />
        </div>
        <Skeleton className="h-12 w-36 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithErrorSkeleton className="md:col-span-2" />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </ModificationFormSectionSkeleton>

          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton className="md:col-span-2" />
            </div>
          </ModificationFormSectionSkeleton>

          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </ModificationFormSectionSkeleton>

          <ModificationFormSectionSkeleton>
            <div className="grid grid-cols-2 gap-x-6 md:grid-cols-4">
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
              <FieldWithErrorSkeleton />
            </div>
          </ModificationFormSectionSkeleton>
        </div>

        <div className="space-y-6">
          <ModificationFormSectionSkeleton>
            <div className="flex flex-col gap-6">
              <Skeleton className="h-10 w-full rounded-lg" />
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-12.5 w-34 rounded-md" />
                <Skeleton className="h-12.5 w-34 rounded-md" />
                <Skeleton className="h-12.5 w-34 rounded-md" />
              </div>
            </div>
          </ModificationFormSectionSkeleton>

          <ModificationFormSectionSkeleton>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-8">
              <Skeleton className="size-12 rounded-full" />
              <Skeleton className="h-5 w-48 rounded-sm" />
              <Skeleton className="h-4 w-56 rounded-sm" />
            </div>
          </ModificationFormSectionSkeleton>

          <Skeleton className="h-44 w-full rounded-3xl" />
        </div>
      </div>
    </Fragment>
  );
};
