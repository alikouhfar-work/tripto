import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DataTable, TableSearchParams } from '@/components/shared/DataTable';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { accommodationListColumns } from '@/features/accommodation';
import { AccommodationColumns } from '@/features/accommodation/types/accommodation';
import { getAccommodations } from '@/features/accommodation/server/queries';
import { deleteAccommodation } from '@/features/accommodation/server/commands';
import { IconBed } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accommodations',
};

/** Hotel-only "manage rooms" shortcut, rendered inside the actions column. */
const renderAccommodationExtraActions = (row: AccommodationColumns) => {
  if (row.type !== 'HOTEL') return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/accommodations/${row.id}/rooms`} aria-label={`Manage rooms for ${row.title}`}>
          <ButtonPrimary color="indigo" size="icon" tone="solid">
            <IconBed size={16} />
          </ButtonPrimary>
        </Link>
      </TooltipTrigger>
      <TooltipContent>Manage rooms</TooltipContent>
    </Tooltip>
  );
};

const AccommodationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<TableSearchParams>;
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-6">
        <PageBreadcrumb currentPageTitle="Accommodations" className="mb-5" />
        <h3 className="text-3xl font-extrabold">Accommodations</h3>
      </div>
      <DataTable
        entityName="accommodations"
        columns={accommodationListColumns}
        query={getAccommodations}
        deleteAction={deleteAccommodation}
        searchParams={searchParams}
        extraActions={renderAccommodationExtraActions}
      />
    </div>
  );
};

export default AccommodationsPage;
