import { DetailViewSkeleton } from '@/components/shared/DetailView';
import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';

const DestinationDetailLoading = () => {
  return (
    <div className="w-full">
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <DetailViewSkeleton />
    </div>
  );
};

export default DestinationDetailLoading;
