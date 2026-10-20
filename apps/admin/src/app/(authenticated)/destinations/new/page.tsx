import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { DestinationForm } from '@/features/destination';
import { decodeFormState } from '@/server/form-state';

export const metadata: Metadata = {
  title: 'New Destination',
};

const DestinationCreatePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;
  const state = decodeFormState(params.form);

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
        currentPageTitle="New"
      />
      <DestinationForm state={state} />
    </article>
  );
};

export default DestinationCreatePage;
