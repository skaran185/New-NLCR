import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {
  stats = [
    { label: 'Total Users',    value: '0', icon: 'people',         color: '#4f46e5' },
    { label: 'Active Hosts',   value: '0', icon: 'home',           color: '#0891b2' },
    { label: 'Vehicles',       value: '0', icon: 'directions_car', color: '#059669' },
    { label: 'Bookings Today', value: '0', icon: 'calendar_month', color: '#d97706' },
  ];
}
