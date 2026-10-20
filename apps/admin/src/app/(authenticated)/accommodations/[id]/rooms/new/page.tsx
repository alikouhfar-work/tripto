import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { RoomForm } from '@/features/accommodation/hotel/room/components/RoomForm';
import { getCurrenciesDropdown } from '@/features/currency/server/queries';
import { decodeFormState } from '@/server/form-state';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Room',
};

type AccommodationRoomsNewPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const AccommodationRoomsNewPage = async ({
  params,
  searchParams,
}: AccommodationRoomsNewPageProps) => {
  const [{ id: accommodationId }, query, currencyOptions] = await Promise.all([
    params,
    searchParams,
    getCurrenciesDropdown(),
  ]);
  const state = decodeFormState(query.form);

  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[
          { route: '/accommodations', title: 'Accommodations' },
          { route: `/accommodations/${accommodationId}`, title: 'Hotel' },
          { route: `/accommodations/${accommodationId}/rooms`, title: 'Rooms' },
        ]}
        className="mb-5"
        currentPageTitle="Add Room"
      />

      <RoomForm
        accommodationId={accommodationId}
        state={state}
        currencyOptions={currencyOptions}
      />
    </article>
  );
};

export default AccommodationRoomsNewPage;
