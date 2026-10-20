import type { DocumentBucket } from '@/features/document/types/document';

export type ServerTableParams = {
  page: number;
  pageSize: number;
  filter: string;
  sort: { id: string; desc?: boolean }[];
};

export type ServerTableResponse<TData> = {
  data: TData[];
  total: number;
};

export type DataTableImageCellProps = {
  id: string;
  title: string;
  bucket: DocumentBucket;
  placeholderPatternUrl?: string;
  placeholderPatternSize?: number;
  placeholderPatternOpacity?: number;
};
