import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { CurrencyFormSkeleton } from '@/features/currency';
import { Fragment } from 'react';

const CurrencyCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <CurrencyFormSkeleton />
    </Fragment>
  );
};

export default CurrencyCreateLoading;
