import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { ActivityFormSkeleton } from '@/features/activity';
import { Fragment } from 'react';

const ActivityCreateLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={2} className="mb-5" />
      <ActivityFormSkeleton />
    </Fragment>
  );
};

export default ActivityCreateLoading;
