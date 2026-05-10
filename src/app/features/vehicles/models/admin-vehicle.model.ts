export interface AdminVehicleQuery {
  search?: string;
  statusFilter: string;
  categoryFilter: string;
  approvalFilter: string;
  sortBy: string;
  pageNumber: number;
  pageSize: number;
}

export interface AdminVehicleImageInfo {
  total: number;
  pending: number;
}

export interface AdminVehicleSummary {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  category: string;
  categoryId: string;
  hostName: string;
  hostEmail: string;
  hostInitials: string;
  listingStatus: 'ACTIVE' | 'DRAFT' | 'INACTIVE';
  adminApproval: 'APPROVED' | 'PENDING' | 'REJECTED';
  images: AdminVehicleImageInfo;
  averageRating: number;
  totalReviews: number;
  startingDailyRate: number | null;
  isCarApprovedFromAdmin: boolean;
  createdAt: string;
}

export interface AdminVehicleStats {
  total: number;
  pendingApproval: number;
  active: number;
  imagesPending: number;
  draft: number;
}

export interface PaginationMeta {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface AdminVehicleListResponse {
  data: AdminVehicleSummary[];
  stats: AdminVehicleStats;
  pagination: PaginationMeta;
}

export interface ApproveVehicleRequest {
  isApproved: boolean;
  remarks?: string;
}

export interface AdminVehicleImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
  isApproved: boolean;
}