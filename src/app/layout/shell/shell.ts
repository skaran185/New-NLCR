import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
