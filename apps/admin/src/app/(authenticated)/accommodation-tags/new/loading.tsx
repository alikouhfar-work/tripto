import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { AccommodationTagFormSkeleton } from '@/features/accommodation-tag';
import { Fragment } from 'react';

const AccommodationTagCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <AccommodationTagFormSkeleton />
    </Fragment>
  );
};

export default AccommodationTagCreateLoading;
