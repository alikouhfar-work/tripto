import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { CurrencyForm, getCurrency } from '@/features/currency';
import { decodeFormState } from '@/server/form-state';

interface CurrencyEditPageParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<CurrencyEditPageParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { title } = await getCurrency(id);
  return { title };
};

const CurrencyEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<CurrencyEditPageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { id } = await params;
  const query = await searchParams;
  const currency = await getCurrency(id);
  const state = decodeFormState(query.form);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/currencies',
            title: 'Currencies',
          },
        ]}
        className="mb-5"
        currentPageTitle={currency.title}
      />
      <CurrencyForm initialData={currency} state={state} />
    </article>
  );
};

export default CurrencyEditPage;
