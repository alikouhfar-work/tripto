import { DataTableSkeleton } from '@/components/shared/DataTable';
import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';

const DestinationsLoading = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6">
        <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
        <div className="h-9 w-48 animate-pulse rounded-md bg-accent" />
      </div>
      <DataTableSkeleton columnCount={5} />
    </div>
  );
};

export default DestinationsLoading;
