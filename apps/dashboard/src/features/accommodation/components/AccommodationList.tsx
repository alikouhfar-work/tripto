import { DataTable } from '@/components/shared/DataTable';
import { FC } from 'react';
import { useGetAccommodations } from '@/features/accommodation/hooks/useGetAccommodations';
import { useDeleteAccommodation } from '@/features/accommodation/hooks/useDeleteAccommodation';
import { accommodationListColumns } from '@/features/accommodation/lib/accommodationListColumns';

export const AccommodationList: FC = () => {
  return (
    <DataTable
      showActionColumn
      showCreateButton
      showRefetchButton
      entityName="accommodations"
      useGetHook={useGetAccommodations}
      useDeleteHook={useDeleteAccommodation}
      columns={accommodationListColumns}
    />
  );
};
