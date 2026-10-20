import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ModificationFormTitle } from '@/components/shared/ModificationForm/ModificationFormTitle';
import { getAccommodation } from '@/features/accommodation';
import { HotelForm } from '@/features/accommodation/hotel/components/HotelForm';
import { HouseForm } from '@/features/accommodation/house/components/HouseForm';
import { decodeFormState } from '@/server/form-state';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';

interface AccommodationEditPageParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, countryCode } = await getAccommodation(id);
  const countryFlag = convertCountryCodeToFlag(countryCode);
  return { title: `${countryFlag}${title}` };
};

const AccommodationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<AccommodationEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const accommodation = await getAccommodation(id);
  const state = decodeFormState(query.form);
  const countryFlag = convertCountryCodeToFlag(accommodation.countryCode);
  const isHouse = Boolean(accommodation.house);

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
        currentPageTitle={`${countryFlag} ${accommodation.title}`}
      />
      <ModificationFormTitle
        title={{
          create: '',
          edit: `Edit ${accommodation.title}`,
        }}
        description={{
          create: '',
          edit: 'Update accommodation details and availability.',
        }}
        className="mb-8"
        isEditMode
      />
      <div className="relative">
        {isHouse ? (
          <HouseForm initialData={accommodation} state={state} />
        ) : (
          <HotelForm initialData={accommodation} state={state} />
        )}
      </div>
    </article>
  );
};

export default AccommodationEditPage;
