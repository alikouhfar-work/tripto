import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { DestinationForm, getDestination } from '@/features/destination';

interface DestinationParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<DestinationParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { country, city } = await getDestination(id);
  return { title: `${country}, ${city}` };
};

const DestinationEditPage = async ({ params }: { params: Promise<DestinationParams> }) => {
  const { id } = await params;
  const destination = await getDestination(id);

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
      <DestinationForm initialData={destination} />
    </article>
  );
};

export default DestinationEditPage;
