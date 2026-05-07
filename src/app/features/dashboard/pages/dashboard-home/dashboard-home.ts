import { Component } from '@angular/core';
import { DashboardStats } from '../../dashboard';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {
  stats = [
    { label: 'Total Users', value: '0', icon: 'people', color: '#4f46e5' },
    { label: 'Active Hosts', value: '0', icon: 'home', color: '#0891b2' },
    { label: 'Vehicles', value: '0', icon: 'directions_car', color: '#059669' },
    { label: 'Bookings Today', value: '0', icon: 'calendar_month', color: '#d97706' },
  ];

  dashboardData: DashboardStats | null = null;
  loading = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data: any) => {
        this.dashboardData = data;
        this.stats = [
          { label: 'Total Users', value: data.totalUsers, icon: 'people', color: '#6366f1' },
          { label: 'Total Hosts', value: data.totalHosts, icon: 'business', color: '#0ea5e9' },
          { label: 'Pending Approvals', value: data.pendingHostApprovals, icon: 'pending_actions', color: '#f59e0b' },
          { label: 'Total Vehicles', value: data.totalVehicles, icon: 'directions_car', color: '#10b981' },
          { label: 'Active Listings', value: data.activeVehicleListings, icon: 'local_offer', color: '#8b5cf6' },
          { label: 'Total Bookings', value: data.totalBookings, icon: 'book_online', color: '#ec4899' },
          { label: 'Active Bookings', value: data.activeBookings, icon: 'event_available', color: '#14b8a6' },
          { label: 'New Users (Month)', value: data.newUsersThisMonth, icon: 'person_add', color: '#f97316' },
        ];
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard fetch failed', err);
        this.loading = false;
      }
    });
  }
}
