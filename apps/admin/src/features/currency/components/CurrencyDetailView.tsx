import {
  DetailBoolean,
  DetailPills,
  DetailView,
  detailText,
  formatDetailDate,
} from '@/components/shared/DetailView';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { getCurrency } from '../server/queries';

type CurrencyDetailViewProps = {
  currency: Awaited<ReturnType<typeof getCurrency>>;
};

export const CurrencyDetailView = ({ currency }: CurrencyDetailViewProps) => {
  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/currencies', title: 'Currencies' }]}
        className="mb-5"
        currentPageTitle={currency.title}
      />
      <DetailView
        title={`${currency.title} (${currency.isoCode})`}
        backHref="/currencies"
        backLabel="currencies"
        editHref={`/currencies/${currency.id}/edit`}
        rows={[
          { label: 'Symbol', value: detailText(currency.symbol) },
          {
            label: 'Active',
            value: <DetailBoolean value={currency.isActive} trueLabel="Active" falseLabel="Inactive" />,
          },
          {
            label: 'Used by',
            value: (
              <DetailPills
                items={[
                  `${currency.activityCount} activit${currency.activityCount === 1 ? 'y' : 'ies'}`,
                  `${currency.houseCount} house${currency.houseCount === 1 ? '' : 's'}`,
                  `${currency.roomCount} room${currency.roomCount === 1 ? '' : 's'}`,
                ]}
              />
            ),
          },
          { label: 'Created at', value: formatDetailDate(currency.createdAt) },
          { label: 'Updated at', value: formatDetailDate(currency.updatedAt) },
        ]}
      />
    </article>
  );
};
