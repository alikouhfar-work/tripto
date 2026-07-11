import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { AccommodationFormsWrapper, getAccommodation } from '@/features/accommodation';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';

interface AccommodationParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const {
    title,
    address: { countryCode },
  } = await getAccommodation(id);
  const countryFlag = convertCountryCodeToFlag(countryCode);
  return { title: `${countryFlag}${title}` };
};

const AccommodationEditPage = async ({ params }: { params: Promise<AccommodationParams> }) => {
  const { id } = await params;
  const accommodation = await getAccommodation(id);
  const countryFlag = convertCountryCodeToFlag(accommodation.address.countryCode);

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
      <AccommodationFormsWrapper initialData={accommodation} />
    </article>
  );
};

export default AccommodationEditPage;
