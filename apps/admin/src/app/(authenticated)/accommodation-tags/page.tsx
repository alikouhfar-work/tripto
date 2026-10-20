import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { DataTable } from '@/components/shared/DataTable';
import { accommodationTagListColumns } from '@/features/accommodation-tag';
import { getAccommodationTags } from '@/features/accommodation-tag/server/queries';
import {
  deleteAccommodationTag,
  toggleAccommodationTagActive,
} from '@/features/accommodation-tag/server/commands';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accommodation Tags',
};

const AccommodationTagsPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6">
        <PageBreadcrumb currentPageTitle="Accommodation Tags" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Accommodation Tags</h3>
      </div>
      <DataTable entityName="accommodation-tags" columns={accommodationTagListColumns} query={getAccommodationTags} deleteAction={deleteAccommodationTag} toggleActiveAction={toggleAccommodationTagActive} searchParams={searchParams} />
    </div>
  );
};

export default AccommodationTagsPage;
