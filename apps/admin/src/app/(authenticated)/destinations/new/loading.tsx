import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { DestinationFormSkeleton } from '@/features/destination';
import { Fragment } from 'react';

const DestinationCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <DestinationFormSkeleton />
    </Fragment>
  );
};

export default DestinationCreateLoading;
