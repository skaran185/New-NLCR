export interface AdminUserQuery {
  search?: string;
  roleFilter: string;
  accountStatusFilter: string;
  sortBy: string;
  pageNumber: number;
  pageSize: number;
}

export interface AdminUserSummary {
  id: string;
  fullName: string | null;
  email: string | null;
  mobileNumber: string | null;
  profileImageUrl: string | null;
  roleType: string;
  accountStatus: string;
  countryName: string | null;
  countryIsoCode: string | null;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  is2faEnabled: boolean;
  isGuestSession: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  totalBookings: number;
  totalVehicles: number;
}

export interface AdminUserStats {
  total: number;
  customers: number;
  hosts: number;
  suspended: number;
  guestSessions: number;
}

export interface AdminUserListResult {
  data: AdminUserSummary[];
  stats: AdminUserStats;
  totalRecords: number;
}