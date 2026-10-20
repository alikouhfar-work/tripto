import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { DataTable } from "@/components/shared/DataTable"
import { activityTypeListColumns } from "@/features/activity-type"
import { getActivityTypes } from "@/features/activity-type/server/queries"
import { deleteActivityType, toggleActivityTypeActive } from "@/features/activity-type/server/commands"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Activity Types',
}

const ActivityTypesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="mb-6">
                <PageBreadcrumb currentPageTitle="Activity Types" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Activity Types
                </h3>
            </div>
            <DataTable entityName="activity-types" columns={activityTypeListColumns} query={getActivityTypes} deleteAction={deleteActivityType} toggleActiveAction={toggleActivityTypeActive} searchParams={searchParams} />
        </div>
    )
}

export default ActivityTypesPage
