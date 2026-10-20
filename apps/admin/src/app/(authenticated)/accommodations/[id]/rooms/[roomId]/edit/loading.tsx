import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';
import { RoomFormSkeleton } from '@/features/accommodation/hotel/room/components/RoomFormSkeleton';
import { Fragment } from 'react';

const RoomEditLoading = () => {
  return (
    <Fragment>
      <PageBreadcrumbLoading crumbCount={4} className="mb-5" />
      <RoomFormSkeleton />
    </Fragment>
  );
};

export default RoomEditLoading;
