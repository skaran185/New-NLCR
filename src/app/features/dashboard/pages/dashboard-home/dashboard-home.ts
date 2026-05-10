import { Component } from '@angular/core';
import { DashboardStats } from '../../dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {
  stats = [
    { label: 'Total Users', value: '0', icon: 'people', color: '#4f46e5' },
    { label: 'Active Hosts', value: '0', icon: 'home', color: '#0891b2', route: '' },
    { label: 'Vehicles', value: '0', icon: 'directions_car', color: '#059669' },
    { label: 'Bookings Today', value: '0', icon: 'calendar_month', color: '#d97706' },
  ];

  dashboardData: DashboardStats | null = null;
  loading = true;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (data: any) => {
        this.dashboardData = data;
        this.stats = [
          {
            label: 'Total Users',
            value: data.totalUsers,
            icon: 'people',
            color: '#6366f1'
          },
          {
            label: 'Total Hosts',
            value: data.totalHosts,
            icon: 'business',
            color: '#0ea5e9',
            route: '/hosts'
          },
          {
            label: 'Pending Approvals',
            value: data.pendingHostApprovals,
            icon: 'pending_actions',
            color: '#f59e0b',
          },
          {
            label: 'Total Vehicles',
            value: data.totalVehicles,
            icon: 'directions_car',
            color: '#10b981',
            // route: '/vehicles'
          },
          {
            label: 'Active Listings',
            value: data.activeVehicleListings,
            icon: 'local_offer',
            color: '#8b5cf6',
            // route: '/admin/vehicles?status=ACTIVE'
          },
          {
            label: 'Total Bookings',
            value: data.totalBookings,
            icon: 'book_online',
            color: '#ec4899',
            // route: '/admin/bookings'
          },
          {
            label: 'Active Bookings',
            value: data.activeBookings,
            icon: 'event_available',
            color: '#14b8a6',
            // route: '/admin/bookings?status=ACTIVE'
          },
          {
            label: 'New Users (Month)',
            value: data.newUsersThisMonth,
            icon: 'person_add',
            color: '#f97316'
          }
        ];
        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard fetch failed', err);
        this.loading = false;
      }
    });
  }

  navigate(route?: string) {
    if (!route) return;

    this.router.navigateByUrl(route);
  }
}
