import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { ActivityTypeFormSkeleton } from '@/features/activity-type';
import { Fragment } from 'react';

const ActivityTypeCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <ActivityTypeFormSkeleton />
    </Fragment>
  );
};

export default ActivityTypeCreateLoading;
