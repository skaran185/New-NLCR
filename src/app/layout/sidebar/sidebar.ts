import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() closeSidebar = new EventEmitter<void>();
  @Input() isMobile = false;   // ✅ ADD THIS

  navGroups: NavGroup[] = [
    {
      items: [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
      ]
    },
    {
      title: 'Management',
      items: [
        { label: 'Hosts', icon: 'home', route: '/hosts' },
        // { label: 'Users',         icon: 'people',           route: '/users' },
        // { label: 'Vehicles',      icon: 'directions_car',   route: '/vehicles' },
        // { label: 'Bookings',      icon: 'calendar_month',   route: '/bookings' },
        // { label: 'Subscriptions', icon: 'subscriptions',    route: '/subscriptions' },
      ]
    },
    // {
    //   title: 'System',
    //   items: [
    //     { label: 'Lookups',   icon: 'tune',          route: '/lookups' },
    //     { label: 'Reports',   icon: 'bar_chart',     route: '/reports' },
    //     { label: 'Settings',  icon: 'settings',      route: '/settings' },
    //   ]
    // }
  ];
}