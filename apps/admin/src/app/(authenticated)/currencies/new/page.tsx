import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { CurrencyForm } from "@/features/currency"
import { decodeFormState } from "@/server/form-state"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'New Currency',
}

const CurrencyCreatePage = async ({
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
                        route: '/currencies',
                        title: 'Currencies'
                    }
                ]}
                className="mb-5"
                currentPageTitle="New"
            />
            <CurrencyForm state={state} />
        </article>
    )
}

export default CurrencyCreatePage
