import { DataTable } from "@/components/shared/DataTable"
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { activityListColumns } from "@/features/activity"
import { deleteActivity, toggleActivityActive } from "@/features/activity/server/commands"
import { getActivities } from "@/features/activity/server/queries"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Activities',
}

const ActivitiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
    return (
        <div className="w-full flex flex-col">
            <div className="mb-6">
                <PageBreadcrumb currentPageTitle="Activities" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Activities
                </h3>
            </div>
            <DataTable
                entityName="activities"
                columns={activityListColumns}
                query={getActivities}
                deleteAction={deleteActivity}
                toggleActiveAction={toggleActivityActive}
                searchParams={searchParams}
            />
        </div>
    )
}

export default ActivitiesPage
