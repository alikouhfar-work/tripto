import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { CurrencyFormSkeleton } from '@/features/currency';
import { Fragment } from 'react';

const CurrencyEditPageSkeleton = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <CurrencyFormSkeleton />
    </Fragment>
  );
};

export default CurrencyEditPageSkeleton;
