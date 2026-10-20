import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ModificationFormTitle } from '@/components/shared/ModificationForm/ModificationFormTitle';
import { AccommodationTypeTabs, type AccommodationTypeTab } from '@/features/accommodation';
import { HotelForm } from '@/features/accommodation/hotel/components/HotelForm';
import { HouseForm } from '@/features/accommodation/house/components/HouseForm';
import { decodeFormState } from '@/server/form-state';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Accommodation',
};

const AccommodationCreatePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;
  const state = decodeFormState(params.form);
  const type: AccommodationTypeTab = params.type === 'hotel' ? 'hotel' : 'house';

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/accommodations',
            title: 'Accommodations',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <ModificationFormTitle
        title={{
          create: 'Create Accommodation',
          edit: '',
        }}
        description={{
          create: 'Create a new accommodation and configure its details.',
          edit: '',
        }}
        className="mb-8"
        isEditMode={false}
      />

      <AccommodationTypeTabs activeType={type} />

      <div className="relative">
        {type === 'hotel' ? <HotelForm state={state} /> : <HouseForm state={state} />}
      </div>
    </article>
  );
};

export default AccommodationCreatePage;
