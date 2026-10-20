import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityTypeForm } from "@/features/activity-type"
import { decodeFormState } from "@/server/form-state"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Activity Type',
}

const ActivityTypeCreatePage = async ({
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
                        route: '/activity-types',
                        title: 'Activity Types'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <ActivityTypeForm state={state} />
        </article>
    )
}

export default ActivityTypeCreatePage
