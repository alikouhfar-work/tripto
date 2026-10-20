import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { ActivityForm, getActivity } from '@/features/activity';
import { decodeFormState } from '@/server/form-state';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';

type ActivityEditPageParams = {
  id: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title, countryCode } = await getActivity(id);
  const countryFlag = convertCountryCodeToFlag(countryCode);
  return { title: `${countryFlag}${title}` };
};

const ActivityEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<ActivityEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const activity = await getActivity(id);
  const state = decodeFormState(query.form);

  const countryFlag = convertCountryCodeToFlag(activity.countryCode);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/activities',
            title: 'Activities',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${countryFlag} ${activity.title}`}
      />
      <ActivityForm initialData={activity} state={state} />
    </article>
  );
};

export default ActivityEditPage;
