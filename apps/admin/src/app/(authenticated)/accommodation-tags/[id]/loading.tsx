import { DetailViewSkeleton } from '@/components/shared/DetailView';
import { PageBreadcrumbLoading } from '@/components/shared/PageBreadcrumb';

const AccommodationTagDetailLoading = () => {
  return (
    <div className="w-full">
      <PageBreadcrumbLoading crumbCount={3} className="mb-5" />
      <DetailViewSkeleton rowCount={6} />
    </div>
  );
};

export default AccommodationTagDetailLoading;
