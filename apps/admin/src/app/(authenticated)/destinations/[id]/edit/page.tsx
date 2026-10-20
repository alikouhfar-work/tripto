import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { DestinationForm, getDestination } from '@/features/destination';
import { decodeFormState } from '@/server/form-state';

interface DestinationEditPageParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<DestinationEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { country, city } = await getDestination(id);
  return { title: `${country}, ${city}` };
};

const DestinationEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<DestinationEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const destination = await getDestination(id);
  const state = decodeFormState(query.form);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/destinations',
            title: 'Destinations',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${destination.country}, ${destination.city}`}
      />
      <DestinationForm initialData={destination} state={state} />
    </article>
  );
};

export default DestinationEditPage;
