// dashboard.model.ts
export interface RecentBooking {
  bookingId: string;
  bookingReference: string;
  customerName: string;
  vehicleName: string;
  status: string;
  scheduledPickupAt: string;
  totalChargeAmount: number | null;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalHosts: number;
  pendingHostApprovals: number;
  totalVehicles: number;
  activeVehicleListings: number;
  totalBookings: number;
  activeBookings: number;
  newUsersThisMonth: number;
  recentBookings: RecentBooking[];
}