import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { ActivityForm } from "@/features/activity"
import { decodeFormState } from "@/server/form-state"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Activity',
}

const ActivityCreatePage = async ({
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
                        route: '/activities',
                        title: 'Activities'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <ActivityForm state={state} />
        </article>
    )
}

export default ActivityCreatePage
