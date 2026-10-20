import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb"
import { DataTable } from "@/components/shared/DataTable"
import { currencyListColumns } from "@/features/currency"
import { getCurrencies } from "@/features/currency/server/queries"
import { deleteCurrency, toggleCurrencyActive } from "@/features/currency/server/commands"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Currencies',
}

const CurrenciesPage = async ({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
    return (
        <div className="w-full flex flex-col">
            <div className="mb-6">
                <PageBreadcrumb currentPageTitle="Currencies" className="mb-5" />
                <h3 className="text-3xl font-extrabold">
                    Currencies
                </h3>
            </div>
            <DataTable entityName="currencies" columns={currencyListColumns} query={getCurrencies} deleteAction={deleteCurrency} toggleActiveAction={toggleCurrencyActive} searchParams={searchParams} />
        </div>
    )
}

export default CurrenciesPage
