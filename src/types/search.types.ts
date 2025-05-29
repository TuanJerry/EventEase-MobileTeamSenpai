export interface SearchEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  participantNumber: number;
  position: string;
  images: Array<{
    id: string;
    link: string;
    size: number;
    filename: string;
  }>;
  hashtags: Array<{
    id: string;
    name: string;
    usageCount: number;
  }>;
}

export interface SearchResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    items: SearchEvent[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
} 