export type DocumentCategory = 'hero' | 'gallery' | 'roomGallery';
export type DocumentBucket = 'activities' | 'accommodations';

export type GetDocumentParams = {
  object: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type DeleteDocumentParams = {
  bucket: string;
  object: string;
};

export type ImagePreviewProps = {
  src?: string;
  title?: string;
  className: string;
  onDelete: () => void;
};

export type ImagePreviewWrapperProps = {
  id: string;
  title: string;
  object: string;
  className?: string;
  bucket: DocumentBucket;
  category?: DocumentCategory;
};

export type ImagesPreviewWrapperProps = {
  id: string;
  title: string;
  prefix: string;
  className?: string;
  skeletonCount?: number;
  bucket: DocumentBucket;
  category?: DocumentCategory;
};

export type ImagesPreviewWrapperSkeletonProps = {
  count?: number;
  className?: string;
};
