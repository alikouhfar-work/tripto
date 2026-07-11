export type DocumentCategory = 'hero' | 'gallery' | 'roomGallery';
export type DocumentBucket = 'activities' | 'accommodations';

export type ImagePreviewProps = {
  src?: string;
  title?: string;
  className: string;
};

export type ImagePreviewWrapperProps = {
  id: string;
  title: string;
  object: string;
  className?: string;
  bucket: DocumentBucket;
  category?: DocumentCategory;
};
