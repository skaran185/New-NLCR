import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent {

  sidebarCollapsed = false;
  isMobile = window.innerWidth <= 768;

  constructor() {
    // set initial state properly
    this.sidebarCollapsed = this.isMobile;
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;

    // auto adjust when switching screens
    if (this.isMobile) {
      this.sidebarCollapsed = true;
    } else {
      this.sidebarCollapsed = false;
    }
  }
}