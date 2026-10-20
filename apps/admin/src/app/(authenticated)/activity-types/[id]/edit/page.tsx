import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ActivityTypeForm, getActivityType } from '@/features/activity-type';
import { decodeFormState } from '@/server/form-state';

type ActivityTypeEditPageParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityTypeEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, emoji } = await getActivityType(id);
  return { title: `${emoji}${title}` };
};

const ActivityTypeEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<ActivityTypeEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const activityType = await getActivityType(id);
  const state = decodeFormState(query.form);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/activity-types',
            title: 'Activity Types',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${activityType.emoji} ${activityType.title}`}
      />
      <ActivityTypeForm initialData={activityType} state={state} />
    </article>
  );
};

export default ActivityTypeEditPage;
