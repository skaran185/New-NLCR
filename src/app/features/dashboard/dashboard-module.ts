import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';


const routes: Routes = [
  { path: '', component: DashboardHome }
];

@NgModule({
  declarations: [DashboardHome],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class DashboardModule {}