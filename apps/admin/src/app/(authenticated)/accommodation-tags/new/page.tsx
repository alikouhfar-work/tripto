import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { Metadata } from 'next';
import { AccommodationTagForm } from '@/features/accommodation-tag';
import { decodeFormState } from '@/server/form-state';

export const metadata: Metadata = {
  title: 'New Accommodation Tag',
};

const AccommodationTagCreatePage = async ({
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
            route: '/accommodation-tags',
            title: 'Accommodation Tags',
          },
        ]}
        className="mb-5"
        currentPageTitle="New"
      />
      <AccommodationTagForm state={state} />
    </article>
  );
};

export default AccommodationTagCreatePage;
