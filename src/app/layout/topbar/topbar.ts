import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
 
@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class TopbarComponent {
   @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
 
  constructor(private auth: AuthService, private router: Router) {}
 
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
