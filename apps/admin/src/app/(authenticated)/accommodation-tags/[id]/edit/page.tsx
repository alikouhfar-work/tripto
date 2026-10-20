import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { AccommodationTagForm, getAccommodationTag } from '@/features/accommodation-tag';
import { decodeFormState } from '@/server/form-state';

type AccommodationTagEditPageParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<AccommodationTagEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, emoji } = await getAccommodationTag(id);
  return { title: `${emoji}${title}` };
};

const AccommodationTagEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<AccommodationTagEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const activityTag = await getAccommodationTag(id);
  const state = decodeFormState(query.form);

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
        currentPageTitle={`${activityTag.emoji} ${activityTag.title}`}
      />
      <AccommodationTagForm initialData={activityTag} state={state} />
    </article>
  );
};

export default AccommodationTagEditPage;
