import { DataTable } from '@/components/shared/DataTable';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { destinationListColumns } from '@/features/destination';
import { deleteDestination, toggleDestinationActive } from '@/features/destination/server/commands';
import { getDestinations } from '@/features/destination/server/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destinations',
};

const DestinationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6">
        <PageBreadcrumb currentPageTitle="Destinations" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Destinations</h3>
      </div>
      <DataTable
        entityName="destinations"
        columns={destinationListColumns}
        query={getDestinations}
        deleteAction={deleteDestination}
        toggleActiveAction={toggleDestinationActive}
        searchParams={searchParams}
      />
    </div>
  );
};

export default DestinationsPage;
