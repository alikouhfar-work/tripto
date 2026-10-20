import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { AccommodationFormSkeleton } from '@/features/accommodation';
import { Fragment } from 'react';

const AccommodationCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <AccommodationFormSkeleton />
    </Fragment>
  );
};

export default AccommodationCreateLoading;
